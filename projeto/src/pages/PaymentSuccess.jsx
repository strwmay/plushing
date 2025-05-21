import { Link } from "react-router";

// componente para exibir mensagem de sucesso após o pagamento
const PaymentSuccess = () => {
  return (
    <div className="payment-success py-5">
      <div className="container">
        <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
          {/* ícone de sucesso */}
          <div className="success-icon mb-4" style={{ color: "#8b5e3c" }}>
            ✅
          </div>
          {/* título principal */}
          <h1 className="cute-heading mb-3">Pagamento Aprovado!</h1>
          {/* mensagem de confirmação */}
          <p className="lead mb-4">
            Seu pedido foi confirmado e está sendo preparado com muito carinho.
          </p>

          {/* alerta com informações adicionais */}
          <div
            className="alert alert-info rounded-4 mb-4"
            style={{ backgroundColor: "#f5e4d3", color: "#5a3e2b" }}
          >
            <p className="mb-0">
              <strong>Fique atento!</strong> Enviaremos atualizações sobre seu
              pedido por email e/ou mensagens no celular.
            </p>
          </div>

          {/* resumo do pedido */}
          <div className="order-details mb-4 p-3 rounded-4 bg-light">
            <h5 className="cute-heading mb-3">Resumo do Pedido</h5>
            {/* número do pedido */}
            <p className="mb-1">
              <strong>Número do pedido:</strong> #12345
            </p>
            {/* data do pedido */}
            <p className="mb-1">
              <strong>Data:</strong> {new Date().toLocaleDateString()}
            </p>
            {/* status do pedido */}
            <p className="mb-0">
              <strong>Status:</strong> Em produção
            </p>
          </div>

          {/* botão para voltar à página inicial */}
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/"
              className="btn rounded-pill px-4"
              style={{ backgroundColor: "#8b5e3c", color: "#fff" }}
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
