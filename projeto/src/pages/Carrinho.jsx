import { useState } from "react"
import { Link, useNavigate } from "react-router"

// componente principal do carrinho
const Carrinho = ({ cart, setCart }) => {
  const [observations, setObservations] = useState("") // estado para observações do pedido
  const navigate = useNavigate() // hook para navegação

  // função para remover item do carrinho
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId))
  }

  // função para calcular o total do carrinho
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0)
  }

  // função para finalizar a compra
  const handleCheckout = () => {
    // simulação de finalização de compra
    setTimeout(() => {
      navigate("/payment-success") // redireciona para a página de sucesso
      setCart([]) // limpa o carrinho
    }, 1000)
  }

  return (
    <div className="cart-page py-5">
      <div className="container">
        <h1 className="mb-4 cute-heading">Carrinho de Compras</h1>

        {cart.length > 0 ? ( // verifica se o carrinho tem itens
          <div className="row">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  {cart.map((item) => ( // itera sobre os itens do carrinho
                    <div key={item.id} className="cart-item mb-3 pb-3 border-bottom">
                      <div className="row align-items-center">
                        <div className="col-3 col-md-2">
                          <div
                            className="bear-preview"
                            style={{
                              backgroundColor: item.color.hex, // cor do ursinho
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              position: "relative",
                            }}
                          >
                            {/* adicionando ursinho de pré-visualização */}
                          </div>
                        </div>
                        <div className="col-9 col-md-6">
                          <h5 className="cute-heading">{item.bearName || "Ursinho Personalizado"}</h5>
                          <p className="mb-0 text-muted">
                            {item.size.name} | {item.color.name} {/* tamanho e cor do ursinho */}
                            {item.accessories.length > 0 && <span> | {item.accessories.length} acessório(s)</span>}
                          </p>
                          {item.giftTo && <small className="text-muted">Para: {item.giftTo}</small>} {/* destinatário */}
                        </div>
                        <div className="col-6 col-md-2 mt-3 mt-md-0 text-md-end">
                          <p className="fw-bold mb-0">R$ {item.price.toFixed(2)}</p> {/* preço do item */}
                        </div>
                        <div className="col-6 col-md-2 mt-3 mt-md-0 text-end">
                          <button
                            className="btn btn-sm btn-outline-danger rounded-pill"
                            onClick={() => removeFromCart(item.id)} // botão para remover item
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* informações do pedido */}
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                  <h5 className="card-title mb-4 cute-heading">Resumo do Pedido</h5>

                  <div className="d-flex justify-content-between mb-4 fw-bold">
                    <span>Total:</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span> {/* exibe o total */}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="observations" className="form-label">
                      Observações
                    </label>
                    <textarea
                      className="form-control rounded-4"
                      id="observations"
                      rows="3"
                      value={observations} // estado das observações
                      onChange={(e) => setObservations(e.target.value)} // atualiza o estado
                      placeholder="Alguma informação adicional sobre seu pedido?"
                    ></textarea>
                  </div>
                  {/* botões para concluir o pedido ou continuar comprando */}
                  <button className="btn btn-primary w-100 mb-2 rounded-pill" onClick={handleCheckout}>
                    Finalizar Compra
                  </button>
                  <Link to="/customize" className="btn btn-outline-secondary w-100 rounded-pill">
                    Continuar Comprando
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // se o carrinho estiver vazio exibe mensagem e botão para personalizar ursinho
          <div className="text-center py-5 card border-0 shadow-sm rounded-4">
            <div className="mb-4">
              <div className="empty-cart-icon">🛒</div>
            </div>
            <h3 className="cute-heading">Seu carrinho está vazio</h3>
            <p className="text-muted mb-4">Adicione alguns ursinhos personalizados para continuar.</p>
            <div className="d-flex justify-content-center">
              <Link to="/customize" className="btn btn-primary rounded-pill px-4">
                Personalizar Ursinho
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Carrinho

