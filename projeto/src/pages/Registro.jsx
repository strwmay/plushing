import { useState } from "react"
import { Link, Navigate } from "react-router"

// Componente de registro de usuário
const Registro = ({ handleLogin, isLoggedIn }) => {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("") // Estado para mensagens de erro

  // Atualiza os dados do formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Valida os dados do formulário
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Validação básica de email
    if (!emailRegex.test(formData.email)) {
      setError("Por favor, insira um email válido.")
      return false
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.")
      return false
    }

    return true
  }

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("") // Limpa mensagens de erro

    if (validateForm()) {
      handleLogin() // Simula o login após o registro
    }
  }

  // Redireciona para a página inicial se o usuário já estiver logado
  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="register-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 cute-heading">Criar Conta</h2>

                {/* Exibe mensagens de erro, se houver */}
                {error && (
                  <div className="alert alert-danger rounded-pill" role="alert" style={{ backgroundColor: "#d9a679", color: "#5a3e2b" }}>
                    {error}
                  </div>
                )}

                {/* Formulário de registro */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-pill"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-pill"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirmar Senha
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-pill"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn w-100 rounded-pill" style={{ backgroundColor: "#8b5e3c", color: "#fff" }}>
                    Registrar
                  </button>
                </form>

                {/* Link para a página de login */}
                <div className="text-center mt-3">
                  <p>
                    Já tem uma conta? <Link to="/login" style={{ color: "#8b5e3c" }}>Entrar</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registro