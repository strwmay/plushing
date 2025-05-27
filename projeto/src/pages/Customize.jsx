"use client" // indica que este componente é renderizado no cliente
import { useState } from "react" // importa o hook useState para gerenciar estados

// define as opções de cores disponíveis para o ursinho
const colorOptions = [
  // cada cor tem um nome e um código hexadecimal
  { name: "Melancia", hex: "#faada5" },
  { name: "Morango", hex: "#ffb8cc" },
  { name: "Pêssego", hex: "#fee7c3" },
  { name: "Laranja", hex: "#ffce9f" },
  { name: "Banana", hex: "#fff699" },
  { name: "Limão", hex: "#e9ed98" },
  { name: "Maçã Verde", hex: "#b6eea7" },
  { name: "Menta", hex: "#a6f5d8" },
  { name: "Algodão-Doce", hex: "#b7e7f3" },
  { name: "Tutti-Frutti", hex: "#99f9ff" },
  { name: "Céu Azul", hex: "#a1c4fe" },
  { name: "Blueberry", hex: "#9e99ff" },
  { name: "Lavanda", hex: "#d5bcfe" },
  { name: "Uva", hex: "#c572f8" },
  { name: "Chiclete", hex: "#ffbdfb" },
  { name: "Chocolate", hex: "#bcaea1" },
  { name: "Amendoim", hex: "#d2c09a" },
  { name: "Café", hex: "#a97a7a" },
  { name: "Chantilly", hex: "#dddddd" },
  { name: "Cravo", hex: "#66747f" },
]

// define os tamanhos disponíveis para o ursinho
const bearSizes = [
  // cada tamanho tem um id, nome e preço
  { id: "pequeno", name: "Pequeno - 20cm", price: 59.9 },
  { id: "medio", name: "Médio - 30cm", price: 89.9 },
  { id: "grande", name: "Grande - 40cm", price: 119.9 },
]

// define os acessórios disponíveis para personalização
const accessories = [
  // cada acessório tem um id, nome, preço e emoji
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
    const accessoriesPrice = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0) // soma os preços dos acessórios
    return basePrice + accessoriesPrice // retorna o preço total
  }

  // adiciona o ursinho personalizado ao carrinho
  const handleAddToCart = () => {
    const item = {
      id: Date.now(), // gera um id único
      size: selectedSize, // tamanho selecionado
      color: selectedColor, // cor selecionada
      accessories: selectedAccessories, // acessórios selecionados
      bearName: bearName, // nome do ursinho
      giftTo: giftTo, // nome do destinatário
      price: calculateTotal(), // calcula o preço total
    }

    addToCart(item) // chama a função para adicionar o item ao carrinho
    alert("Ursinho adicionado ao carrinho!") // exibe uma mensagem de sucesso
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
                      {selectedSize.id === size.id && <div className="selected-badge">✓</div>} {/* exibe um ícone de seleção */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn rounded-pill px-4"
                style={{ backgroundColor: "#8b5e3c", color: "#fff" }}
                onClick={() => setStep(2)} // avança para o próximo passo
              >
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
                  title={color.name} // exibe o nome da cor ao passar o mouse
                ></div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }}
                onClick={() => setStep(1)} // volta para o passo anterior
              >
                Voltar
              </button>
              <button
                className="btn rounded-pill px-4"
                style={{ backgroundColor: "#8b5e3c", color: "#fff" }}
                onClick={() => setStep(3)} // avança para o próximo passo
              >
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
                      <div className="accessory-emoji mb-2">{accessory.emoji}</div> {/* exibe o emoji do acessório */}
                      <h5 className="card-title cute-heading">{accessory.name}</h5>
                      <p className="card-text">R$ {accessory.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }}
                onClick={() => setStep(2)} // volta para o passo anterior
              >
                Voltar
              </button>
              <button
                className="btn rounded-pill px-4"
                style={{ backgroundColor: "#8b5e3c", color: "#fff" }}
                onClick={() => setStep(4)} // avança para o próximo passo
              >
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
                      backgroundColor: selectedColor.hex, // aplica a cor selecionada ao ursinho
                      width: "130px", // largura do corpo do ursinho
                      height: "130px", // altura do corpo do ursinho
                      borderRadius: "50%", // formato circular
                      margin: "0 auto",
                      position: "relative",
                    }}
                  >
                    {/* orelhas */}
                    <div
                      className="bear-ear left"
                      style={{
                        backgroundColor: selectedColor.hex,
                        width: "60px", // largura das orelhas
                        height: "60px", // altura das orelhas
                        borderRadius: "50%", // formato circular
                        position: "absolute",
                        top: "-15px", // posição acima do corpo
                        left: "-3px", // posição ao lado
                      }}
                    ></div>
                    <div
                      className="bear-ear right"
                      style={{
                        backgroundColor: selectedColor.hex,
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        position: "absolute",
                        top: "-15px",
                        right: "-3px",
                      }}
                    ></div>

                    {/* rosto */}
                    <div
                      className="bear-face"
                      style={{
                        position: "absolute",
                        top: "40px", // posição dentro do corpo
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "80px", // largura do rosto
                        height: "80px", // altura do rosto
                        borderRadius: "50%", // formato circular
                      }}
                    >
                      <div
                        className="bear-eye left"
                        style={{
                          position: "absolute",
                          top: "25px", // posição dos olhos
                          left: "15px",
                          width: "8px", // largura dos olhos
                          height: "8px", // altura dos olhos
                          backgroundColor: "#000", // cor preta
                          borderRadius: "50%", // formato circular
                        }}
                      ></div>
                      <div
                        className="bear-eye right"
                        style={{
                          position: "absolute",
                          top: "25px",
                          right: "15px",
                          width: "8px",
                          height: "8px",
                          backgroundColor: "#000",
                          borderRadius: "50%",
                        }}
                      ></div>
                      <div
                        className="bear-nose"
                        style={{
                          position: "absolute",
                          top: "40px", // posição do nariz
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "12px", // largura do nariz
                          height: "8px", // altura do nariz
                          backgroundColor: "#000", // cor preta
                          borderRadius: "50%", // formato circular
                        }}
                      ></div>
                    </div>

                    {selectedAccessories.map((acc, index) => (
                      <div
                        key={acc.id}
                        className="accessory-icon"
                        style={{
                          position: acc.id === "laço" || acc.id === "gravata" || acc.id === "chapeu" || acc.id === "oculos" ? "absolute" : "absolute",
                          top: acc.id === "oculos" ? "30px" : acc.id === "chapeu" ? "-15px" : acc.id === "laço" ? "-10px" : acc.id === "gravata" ? "125px" : `${15 + index * 25}px`,
                          left: acc.id === "laço" ? "80px" : acc.id === "oculos" || acc.id === "chapeu" || acc.id === "gravata" ? "50%" : "auto",
                          transform: acc.id === "oculos" || acc.id === "chapeu" || acc.id === "gravata" ? "translateX(-50%)" : "none",
                          fontSize: acc.id === "oculos" ? "60px" : "20px",
                        }}
                      >
                        {acc.emoji}
                      </div>
                    ))}
                  </div>
                  <h5 className="cute-heading">{selectedSize.name}</h5> {/* exibe o tamanho selecionado */}
                  <p>Cor: {selectedColor.name}</p> {/* exibe a cor selecionada */}
                  {selectedAccessories.length > 0 && (
                    <div>
                      <p>Acessórios:</p>
                      <ul className="list-unstyled">
                        {selectedAccessories.map((acc) => (
                          <li key={acc.id}>
                            {acc.emoji} {acc.name} - R$ {acc.price.toFixed(2)} {/* exibe os acessórios selecionados */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <h4 className="mt-3 cute-heading">Total: R$ {calculateTotal().toFixed(2)}</h4> {/* exibe o preço total */}
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
                      value={bearName} // vincula o valor ao estado bearName
                      onChange={(e) => setBearName(e.target.value)} // atualiza o estado bearName
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
                      value={giftTo} // vincula o valor ao estado giftTo
                      onChange={(e) => setGiftTo(e.target.value)} // atualiza o estado giftTo
                      placeholder="Ex: Maria"
                    />
                  </div>
                </form>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-secondary rounded-pill px-4"
                style={{ borderColor: "#8b5e3c", color: "#8b5e3c" }}
                onClick={() => setStep(3)} // volta para o passo anterior
              >
                Voltar
              </button>
              <button
                className="btn btn-success rounded-pill px-4"
                onClick={handleAddToCart} // add o ursinho ao carrinho
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        )
      default:
        return null // caso o passo não seja válido, não renderiza nada
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
                style={{ width: `${(step / 4) * 100}%`, backgroundColor: "#8b5e3c" }} // calcula a porcentagem do progresso
                aria-valuenow={(step / 4) * 100}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <div className="step-indicators d-flex justify-content-between mt-2">
              {/* indicador do passo 1: tamanho */}
              <div className={`step-indicator ${step >= 1 ? "active" : ""}`}> 
                <span className="step-number">1</span> 
                <span className="step-label d-none d-md-inline">Tamanho</span> 
              </div>

              {/* cor */}
              <div className={`step-indicator ${step >= 2 ? "active" : ""}`}> 
                <span className="step-number">2</span> 
                <span className="step-label d-none d-md-inline">Cor</span> 
              </div>

              {/* acessórios */}
              <div className={`step-indicator ${step >= 3 ? "active" : ""}`}> 
                <span className="step-number">3</span> 
                <span className="step-label d-none d-md-inline">Acessórios</span> 
              </div>

              {/* finalizar */}
              <div className={`step-indicator ${step >= 4 ? "active" : ""}`}> 
                <span className="step-number">4</span> 
                <span className="step-label d-none d-md-inline">Finalizar</span> 
              </div>
            </div>
          </div>

          <div className="customize-content card border-0 shadow-sm rounded-4 p-4">{renderStepContent()}</div> {/* renderiza o conteúdo do passo atual */}
        </div>
      </div>
    </div>
  )
}

export default Customize