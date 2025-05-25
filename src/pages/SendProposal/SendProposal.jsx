import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import "./SendProposal.css";

const SendProposal = () => {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [errors, setErrors] = useState({});
  const [sucesso, setSucesso] = useState("");

  const navigate = useNavigate();
  const { projectId } = useParams();
  const freelancerCpf = localStorage.getItem("cpf");

  const validarCampos = () => {
    const novosErros = {};

    if (!valor.trim()) {
      novosErros.valor = "O valor da proposta é obrigatório.";
    } else if (isNaN(Number(valor)) || Number(valor) <= 0) {
      novosErros.valor = "O valor deve ser um número maior que zero.";
    }

    if (!descricao.trim()) {
      novosErros.descricao = "A descrição é obrigatória.";
    }

    if (!dataEntrega) {
      novosErros.dataEntrega = "A data de entrega é obrigatória.";
    } else {
      const hoje = new Date();
      const data = new Date(dataEntrega);
      hoje.setHours(0, 0, 0, 0);
      if (data < hoje) {
        novosErros.dataEntrega = "A data de entrega não pode ser no passado.";
      }
    }

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const enviarProposta = async () => {
    setSucesso("");
    if (!validarCampos()) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const proposta = {
        projectId: projectId,
        freelancerCpf: freelancerCpf,
        proposalValue: valor,
        proposalDescription: descricao,
        deliveryDate: dataEntrega,
      };

      const response = await fetch(`/api/interests/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(proposta),
      });

      if (response.ok) {
        setSucesso("✅ Proposta enviada com sucesso!");
        setValor("");
        setDescricao("");
        setDataEntrega("");
        setErrors({});
        setTimeout(() => {
          navigate("/meusprojetosfreelancer");
        }, 2000);
      } else {
        alert("❌ Erro ao enviar proposta.");
      }
    } catch (error) {
      alert("❌ Erro de conexão com o servidor.");
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sendproposal-container">
        <div className="sendproposal-content">
          <h2 className="titulo">Enviar <span>proposta</span></h2>

          <div className="campo">
            <label>Valor da proposta</label>
            <input
              type="text"
              placeholder="Insira aqui o valor de sua proposta"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
            {errors.valor && <p className="erro">{errors.valor}</p>}
          </div>

          <div className="campo">
            <label>Descrição da proposta</label>
            <textarea
              placeholder="Insira aqui a descrição da proposta"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {errors.descricao && <p className="erro">{errors.descricao}</p>}
          </div>

          <div className="campo">
            <label>Data de entrega</label>
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
            {errors.dataEntrega && <p className="erro">{errors.dataEntrega}</p>}
          </div>

          <button className="btn-enviar" onClick={enviarProposta}>
            Enviar proposta
          </button>

          {sucesso && <p className="sucesso">{sucesso}</p>}
        </div>
      </div>
    </>
  );
};

export default SendProposal;
