import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook para navegação
import Pix from "../components/Pix";
import Cartao from "../components/Cartao";

const MetodoPagamento = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePayment = () => {
    if (!selectedOption) {
      alert("Por favor, selecione um método de pagamento.");
      return;
    }
    // Redireciona para a página de sucesso
    navigate("/payment-success");
  };

  return (
    <div className="metodo-pagamento container mt-5">
      <h1 className="text-center mb-4">Método de Pagamento</h1>
      <div className="row">
        {/* Coluna da esquerda: Botões */}
        <div className="col-md-4">
          <div className="list-group">
            <button
              className={`list-group-item list-group-item-action ${selectedOption === "cartao" ? "active" : ""}`}
              onClick={() => handleOptionSelect("cartao")}
            >
              Adicionar Cartão
            </button>
            <button
              className={`list-group-item list-group-item-action ${selectedOption === "pix" ? "active" : ""}`}
              onClick={() => handleOptionSelect("pix")}
            >
              Pagar com Pix
            </button>
            <button
              className="btn btn-success mt-4 w-100"
              onClick={handlePayment}
            >
              Confirmar Pagamento
            </button>
          </div>
        </div>

        {/* Coluna da direita: Conteúdo dinâmico */}
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            {selectedOption === "cartao" && (
              <Cartao />
            )}
            {selectedOption === "pix" && (
              <Pix />
            )}
            {selectedOption === "boleto" && (
              <div>
                <h3>Pagar com Boleto</h3>
                <p>Detalhes para pagamento via boleto serão exibidos aqui.</p>
              </div>
            )}
            {!selectedOption && (
              <div>
                <h3>Selecione um método de pagamento</h3>
                <p>Escolha uma das opções à esquerda para continuar.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetodoPagamento;