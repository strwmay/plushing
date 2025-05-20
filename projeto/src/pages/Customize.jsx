"use client"

// importa o hook useState para gerenciar estados
import { useState } from "react"

// define as opções de cores disponíveis para os ursinhos
const colorOptions = [
  { name: "Rosa Claro", hex: "#faada5" },
  { name: "Rosa", hex: "#ffb8cc" },
  { name: "Pêssego", hex: "#fee7c3" },
  { name: "Laranja Claro", hex: "#ffce9f" },
  { name: "Amarelo", hex: "#fff699" },
  { name: "Verde Limão", hex: "#e9ed98" },
  { name: "Verde Claro", hex: "#b6eea7" },
  { name: "Verde Água", hex: "#a6f5d8" },
  { name: "Azul Claro", hex: "#b7e7f3" },
  { name: "Azul Ciano", hex: "#99f9ff" },
  { name: "Azul", hex: "#a1c4fe" },
  { name: "Roxo Claro", hex: "#9e99ff" },
  { name: "Lilás", hex: "#d5bcfe" },
  { name: "Roxo", hex: "#c572f8" },
  { name: "Rosa Pink", hex: "#ffbdfb" },
  { name: "Bege", hex: "#bcaea1" },
  { name: "Bege Escuro", hex: "#d2c09a" },
  { name: "Marrom Claro", hex: "#a97a7a" },
  { name: "Cinza", hex: "#dddddd" },
  { name: "Cinza Escuro", hex: "#66747f" },
]

// define os tamanhos disponíveis para os ursinhos
const bearSizes = [
  { id: "pequeno", name: "Pequeno - 20cm", price: 59.9 },
  { id: "medio", name: "Médio - 30cm", price: 89.9 },
  { id: "grande", name: "Grande - 40cm", price: 119.9 },
]

// define os acessórios disponíveis para personalização
const accessories = [
  { id: "laço", name: "Laço", price: 9.9, emoji: "🎀" },
  { id: "oculos", name: "Óculos", price: 12.9, emoji: "👓" },
  { id: "chapeu", name: "Chapéu", price: 14.9, emoji: "🧢" },
  { id: "gravata", name: "Gravata", price: 9.9, emoji: "👔" },
]

// componente principal de personalização do ursinho
const Customize = ({ addToCart }) => {
  // gerencia o passo atual do processo de personalização
  const [step, setStep] = useState(1)
  // gerencia o tamanho selecionado (padrão: médio)
  const [selectedSize, setSelectedSize] = useState(bearSizes[1])
  // gerencia a cor selecionada (padrão: pêssego)
  const [selectedColor, setSelectedColor] = useState(colorOptions[2])
  // gerencia os acessórios selecionados
  const [selectedAccessories, setSelectedAccessories] = useState([])
  // gerencia o nome do ursinho
  const [bearName, setBearName] = useState("")
  // gerencia o nome do destinatário do presente
  const [giftTo, setGiftTo] = useState("")

  // alterna a seleção de um acessório
  const handleAccessoryToggle = (accessory) => {
    // verifica se o acessório já está selecionado
    if (selectedAccessories.find((a) => a.id === accessory.id)) {
      // remove o acessório da lista
      setSelectedAccessories(selectedAccessories.filter((a) => a.id !== accessory.id))
    } else {
      // adiciona o acessório à lista
      setSelectedAccessories([...selectedAccessories, accessory])
    }
  }

  // calcula o preço total com base no tamanho e acessórios selecionados
  const calculateTotal = () => {
    const basePrice = selectedSize.price // preço base do tamanho
    const accessoriesPrice = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0) // soma dos preços dos acessórios
    return basePrice + accessoriesPrice
  }

  // adiciona o ursinho personalizado ao carrinho
  const handleAddToCart = () => {
    const item = {
      id: Date.now(), // gera um id único
      size: selectedSize,
      color: selectedColor,
      accessories: selectedAccessories,
      bearName: bearName,
      giftTo: giftTo,
      price: calculateTotal(), // calcula o preço total
    }

    addToCart(item) // chama a função para adicionar ao carrinho
    alert("Ursinho adicionado ao carrinho!") // exibe mensagem de sucesso
    // reseta os estados para os valores iniciais
    setStep(1)
    setSelectedAccessories([])
    setBearName("")
    setGiftTo("")
  }

  // renderiza o conteúdo do passo atual
  const renderStepContent = () => {
    switch (step) {
      case 1:
        // renderiza a seleção de tamanho
        return (
          <div className="step-content">
            <h3 className="mb-4 cute-heading">Escolha o tamanho do seu ursinho</h3>
            <div className="row g-3">
              {bearSizes.map((size) => (
                <div className="col-md-4" key={size.id}>
                  <div
                    className={`card h-100 border-0 shadow-sm rounded-4 ${selectedSize.id === size.id ? "selected-card" : ""}`}
                    onClick={() => setSelectedSize(size)} // atualiza o tamanho selecionado
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body text-center p-4">
                      <h5 className="card-title cute-heading">{size.name}</h5>
                      <p className="card-text">R$ {size.price.toFixed(2)}</p>
                      {selectedSize.id === size.id && <div className="selected-badge">✓</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button className="btn rounded-pill px-4" style={{ backgroundColor: "#8b5e3c", color: "#fff" }} onClick={() => setStep(2)}>
                Próximo
              </button>
            </div>
          </div>
        )
      case 2:
        // renderiza a seleção de cor
        return (
          <div className="step-content">
            <h3 className="mb-4 cute-heading">Escolha a cor do seu ursinho</h3>
            <div className="color-grid">
              {colorOptions.map((color) => (
                <div
                  key={color.hex}
                  className={`color-option ${selectedColor.hex === color.hex ? "selected" : ""}`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(color)} // atualiza a cor selecionada
                  title={color.name}
                ></div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-secondary rounded-pill px-4" style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }} onClick={() => setStep(1)}>
                Voltar
              </button>
              <button className="btn rounded-pill px-4" style={{ backgroundColor: "#8b5e3c", color: "#fff" }} onClick={() => setStep(3)}>
                Próximo
              </button>
            </div>
          </div>
        )
      case 3:
        // renderiza a seleção de acessórios
        return (
          <div className="step-content">
            <h3 className="mb-4 cute-heading">Escolha os acessórios (opcional)</h3>
            <div className="row g-3">
              {accessories.map((accessory) => (
                <div className="col-6 col-md-3" key={accessory.id}>
                  <div
                    className={`card h-100 border-0 shadow-sm rounded-4 ${selectedAccessories.find((a) => a.id === accessory.id) ? "selected-card" : ""}`}
                    onClick={() => handleAccessoryToggle(accessory)} // alterna a seleção do acessório
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-body text-center p-4">
                      <div className="accessory-emoji mb-2">{accessory.emoji}</div>
                      <h5 className="card-title cute-heading">{accessory.name}</h5>
                      <p className="card-text">R$ {accessory.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-secondary rounded-pill px-4" style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }} onClick={() => setStep(2)}>
                Voltar
              </button>
              <button className="btn rounded-pill px-4" style={{ backgroundColor: "#8b5e3c", color: "#fff" }} onClick={() => setStep(4)}>
                Próximo
              </button>
            </div>
          </div>
        )
      case 4:
        // renderiza o resumo final e formulário de nomeação
        return (
          <div className="step-content">
            <div className="text-center mb-4">
              <h2 className="display-4 cute-heading">Tcharam!</h2>
              <p className="lead">Seu ursinho está quase pronto!</p>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="bear-preview p-4 text-center">
                  <div
                    className="bear-image mb-3"
                    style={{
                      backgroundColor: selectedColor.hex,
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      margin: "0 auto",
                      position: "relative",
                    }}
                  >
                    {/* Orelhas */}
                    <div className="bear-ear left" style={{ backgroundColor: selectedColor.hex }}></div>
                    <div className="bear-ear right" style={{ backgroundColor: selectedColor.hex }}></div>

                    {/* Rosto */}
                    <div className="bear-face">
                      <div className="bear-eye left"></div>
                      <div className="bear-eye right"></div>
                      <div className="bear-nose"></div>
                      <div className="bear-mouth"></div>
                    </div>

                    {selectedAccessories.map((acc, index) => (
                      <div
                        key={acc.id}
                        className="accessory-icon"
                        style={{
                          position: "absolute",
                          top: `${20 + index * 30}px`,
                          right: `${20 + index * 10}px`,
                          fontSize: "24px",
                        }}
                      >
                        {acc.emoji}
                      </div>
                    ))}
                  </div>
                  <h5 className="cute-heading">{selectedSize.name}</h5>
                  <p>Cor: {selectedColor.name}</p>
                  {selectedAccessories.length > 0 && (
                    <div>
                      <p>Acessórios:</p>
                      <ul className="list-unstyled">
                        {selectedAccessories.map((acc) => (
                          <li key={acc.id}>
                            {acc.emoji} {acc.name} - R$ {acc.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <h4 className="mt-3 cute-heading">Total: R$ {calculateTotal().toFixed(2)}</h4>
                </div>
              </div>

              <div className="col-md-6">
                <form>
                  <div className="mb-3">
                    <label htmlFor="bearName" className="form-label">
                      Qual o nome do seu ursinho?
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="bearName"
                      value={bearName}
                      onChange={(e) => setBearName(e.target.value)}
                      placeholder="Ex: Teddy"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="giftTo" className="form-label">
                      Para quem é este presente?
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="giftTo"
                      value={giftTo}
                      onChange={(e) => setGiftTo(e.target.value)}
                      placeholder="Ex: Maria"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-outline-secondary rounded-pill px-4" style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }} onClick={() => setStep(3)}>
                Voltar
              </button>
              <button className="btn btn-success rounded-pill px-4" onClick={handleAddToCart}>
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="customize-page">
      {/* renderiza o cabeçalho e o progresso */}
      <div className="cloud-bg">
        <div className="container py-5">
          <h1 className="text-center mb-5 cute-heading">Personalize seu Ursinho</h1>

          <div className="progress-container mb-5">
            <div className="progress rounded-pill">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${(step / 4) * 100}%`, backgroundColor: "#8b5e3c" }}
                aria-valuenow={(step / 4) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="step-indicators d-flex justify-content-between mt-2">
              <div className={`step-indicator ${step >= 1 ? "active" : ""}`}>
                <span className="step-number">1</span>
                <span className="step-label d-none d-md-inline">Tamanho</span>
              </div>
              <div className={`step-indicator ${step >= 2 ? "active" : ""}`}>
                <span className="step-number">2</span>
                <span className="step-label d-none d-md-inline">Cor</span>
              </div>
              <div className={`step-indicator ${step >= 3 ? "active" : ""}`}>
                <span className="step-number">3</span>
                <span className="step-label d-none d-md-inline">Acessórios</span>
              </div>
              <div className={`step-indicator ${step >= 4 ? "active" : ""}`}>
                <span className="step-number">4</span>
                <span className="step-label d-none d-md-inline">Finalizar</span>
              </div>
            </div>
          </div>

          <div className="customize-content card border-0 shadow-sm rounded-4 p-4">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  )
}

export default Customize
