import { Link } from "react-router" // importa o componente Link para navegação
import Ursinhos from "/public/Ursinhos.jpg" // importa a imagem do ursinh
import Ursos from "/public/Ursos.png" // importa a imagem dos ursos

const Home = () => {
  return (
    <div className="home-page">
      {/* seção principal com destaque para o produto */}
      <section className="hero-section py-5" style={{ backgroundColor: "#f5e4d3" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="image-container">
                <img
                  src={Ursinhos} // imagem do ursinho
                  alt="Urso Personalizado"
                  className="img-fluid rounded"
                /> {/* imagem do produto */}
              </div>
            </div>
            <div className="col-md-6">
              <h1 className="display-4 fw-bold mb-4 cute-heading">Ursinhos Personalizados</h1> {/* título principal */}
              <p className="lead mb-4">
                Crie o ursinho perfeito para aquela pessoa especial. Nossos ursinhos são feitos com muito carinho e
                atenção aos detalhes.
              </p> {/* descrição do produto */}
              <Link to="/customize" className="btn btn-lg rounded-pill" style={{ backgroundColor: "#8b5e3c", color: "#fff" }}>
                Personalize Agora
              </Link> {/* botão para personalizar */}
            </div>
          </div>
        </div>
      </section>

      {/* seção de características do produto */}
      <section className="features-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 cute-heading">Por que escolher nossos ursinhos?</h2> {/* título da seção */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f5e4d3" }}>
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3" style={{ color: "#8b5e3c" }}>❤️</div> {/* ícone de qualidade */}
                  <h3 className="card-title cute-heading">Qualidade Premium</h3>
                  <p className="card-text">Materiais de alta qualidade para garantir durabilidade e segurança.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f5e4d3" }}>
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3" style={{ color: "#8b5e3c" }}>✨</div>
                  <h3 className="card-title cute-heading">Personalização Total</h3>
                  <p className="card-text">Escolha cores, acessórios e até mesmo adicione mensagens personalizadas.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f5e4d3" }}>
                <div className="card-body text-center p-4">
                  <div className="feature-icon mb-3" style={{ color: "#8b5e3c" }}>🚚</div>
                  <h3 className="card-title cute-heading">Entrega Rápida</h3>
                  <p className="card-text">Seu ursinho personalizado chega em até 7 dias úteis após a confirmação.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* seção explicando como funciona o processo */}
      <section className="como-funciona-section py-5">
        <div className="container">
          <h2 className="text-center mb-5 cute-heading">Como Funciona</h2> {/* título da seção */}
          <div className="row align-items-center mb-5">
            <div className="col-md-6">
              <div className="pe-md-4">
                <h2 className="mb-3 cute-heading">É fácil criar seu ursinho personalizado</h2> {/* subtítulo */}
                <p className="lead">
                  Nosso processo de personalização foi desenvolvido para ser simples e divertido. Em apenas alguns passos,
                  você terá um ursinho único e especial.
                </p> {/* descrição do processo */}
                <p>
                  Escolha o modelo base, selecione as cores, adicione acessórios e pronto! Seu ursinho personalizado será
                  criado com todo o carinho e atenção aos detalhes.
                </p>
              </div>
            </div>
          
            <div className="col-md-6">
              <div className="row g-3 justify-content-center">
                <div className="col-12">
                  <div className="image-container d-flex justify-content-center" style={{ marginTop: "20px" }}>
                    <img
                      src={Ursos} // imagem do processo de personalização
                      alt="Processo de personalização"
                      className="img-fluid rounded"
                    /> {/* imagem ilustrativa */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* seção com passos do processo */}
          <div className="steps-section mt-5">
            <h2 className="text-center mb-4 cute-heading">Passo a Passo</h2> {/* título da seção */}
            <div className="row g-4">
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body text-center p-4">
                    <div className="step-number mb-3">1</div> {/* número do passo */}
                    <h3 className="cute-heading">Escolha o Modelo</h3>
                    <p>Selecione entre nossos diversos modelos de ursinhos disponíveis.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body text-center p-4">
                    <div className="step-number mb-3">2</div> {/* número do passo */}
                    <h3 className="cute-heading">Personalize</h3>
                    <p>Escolha cores, adicione acessórios e personalize cada detalhe.</p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <div className="card-body text-center p-4">
                    <div className="step-number mb-3">3</div> {/* número do passo */}
                    <h3 className="cute-heading">Finalize e Receba</h3>
                    <p>Confirme seu pedido e receba seu ursinho personalizado em casa.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home // exporta o componente Home

