import './ServicesPage.css'
import Footer from '../../components/Footer/Footer'

const Services = () => {
  return (
    <div>
      <div className='servicos_container'>

        {/* Seção: Conheça nossos serviços */}
        <div className='servicos_div2'>
          <h2 id='conheca_nosso_servico'>Conheça nossos serviços</h2>
          <div className='servicos_coluna'>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Social Media</h3>
              <p className='servicos_p'>Transforme suas redes sociais em um canal de vendas. Crie conteúdo engajador, interaja com seu público e aumente o reconhecimento da sua marca.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Criação de sites</h3>
              <p className='servicos_p'>Tenha um site moderno, responsivo e otimizado para SEO. Atraia mais visitantes e converta-os em clientes.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Análise de Dados e Criação de Dashboards</h3>
              <p className='servicos_p'>Transformamos seus dados brutos em insights valiosos para a tomada de decisão. Realizamos a limpeza, tratamento e análise de suas planilhas e bancos de dados, criando dashboards interativos e visualmente intuitivos no Microsoft Power BI.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Tráfego pago</h3>
              <p className='servicos_p'>Direcione seu tráfego para as pessoas certas e gere mais resultados com campanhas de anúncios pagas.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Design</h3>
              <p className='servicos_p'>Um design profissional é a chave para o sucesso do seu negócio. Crie uma identidade visual forte e memorável.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Suporte Técnico de TI Remoto</h3>
              <p className='servicos_p'>Oferecemos suporte técnico ágil e eficiente para resolver os problemas de tecnologia da sua empresa. Através de acesso remoto, realizamos a configuração de e-mails, remoção de vírus, instalação de softwares e solução de problemas em computadores </p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Campanhas de marketing</h3>
              <p className='servicos_p'>Planeje e execute campanhas de marketing integradas para alcançar seus objetivos de negócio.</p>
            </div>
            <div className='div2_content'>
              <h3 className='servicos_h3'>Marketing de conteúdo</h3>
              <p className='servicos_p'>Crie conteúdo de qualidade que atraia e engaje seu público, gerando leads e aumentando a autoridade da sua marca.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Services
