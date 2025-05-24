import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../../components/navbar/Navbar';
import "./FazerProposta.css";

const FazerProposta = () => {
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const navigate = useNavigate();

  const { projectId } = useParams();
  const freelancerCpf = localStorage.getItem("cpf");

  const enviarProposta = async () => {
    try {
      const token = localStorage.getItem("token");

      const proposta = {
        projectId: projectId,
        freelancerCpf: freelancerCpf,
        proposalValue: valor,
        proposalDescription: descricao,
        deliveryDate: dataEntrega,
      };

      const response = await fetch(
        `/api/interests/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(proposta),
        }
      );

      if (response.ok) {
        alert("✅ Proposta enviada com sucesso!");
        navigate("/meusprojetosf");
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
      <div className="fazerproposta-container">
        <div className="fazerproposta-content">
          <h2 className="titulo">Enviar <span>proposta</span></h2>

          <div className="campo">
            <label>Valor da proposta</label>
            <input
              type="text"
              placeholder="Insira aqui o valor de sua proposta"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Descrição da proposta</label>
            <textarea
              placeholder="Insira aqui a descrição da proposta"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Data de entrega</label>
            <input
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </div>

          <button className="btn-enviar" onClick={enviarProposta}>
            Enviar proposta
          </button>
        </div>
      </div>
    </>
  );
};

export default FazerProposta;
