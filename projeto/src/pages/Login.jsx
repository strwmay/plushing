import { useState } from "react"
import { Link, Navigate } from "react-router"

// componente de login de usuário
const Login = ({ handleLogin, isLoggedIn }) => {
  const [email, setEmail] = useState("") // estado para armazenar o email do usuário
  const [password, setPassword] = useState("") // estado para armazenar a senha do usuário
  const [error, setError] = useState("") // estado para exibir mensagens de erro

  // função para validar os dados do formulário
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // regex para validar o formato do email
    if (!emailRegex.test(email)) {
      setError("Por favor, insira um email válido.") // define mensagem de erro para email inválido
      return false
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.") // define mensagem de erro para senha curta
      return false
    }

    return true // retorna true se o formulário for válido
  }

  // função para lidar com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault() // previne o comportamento padrão do formulário
    setError("") // limpa mensagens de erro anteriores

    if (validateForm()) {
      handleLogin() // chama a função de login passada como prop
    }
  }

  // redireciona para a página inicial se o usuário já estiver logado
  if (isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 cute-heading">Entrar</h2>

                {/* exibe mensagens de erro, se houver */}
                {error && (
                  <div className="alert alert-danger rounded-pill" role="alert" style={{ backgroundColor: "#d9a679", color: "#5a3e2b" }}>
                    {error}
                  </div>
                )}

                {/* formulário de login */}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control rounded-pill"
                      id="email"
                      value={email} // vincula o valor do input ao estado do email
                      onChange={(e) => setEmail(e.target.value)} // atualiza o estado do email ao digitar
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
                      value={password} // vincula o valor do input ao estado da senha
                      onChange={(e) => setPassword(e.target.value)} // atualiza o estado da senha ao digitar
                      required
                    />
                  </div>

                  <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Lembrar de mim
                    </label>
                  </div>

                  <button type="submit" className="btn w-100 rounded-pill" style={{ backgroundColor: "#8b5e3c", color: "#fff" }}>
                    Entrar
                  </button>
                </form>

                {/* link para a página de registro */}
                <div className="text-center mt-3">
                  <p>
                    Não tem uma conta? <Link to="/registro" style={{ color: "#8b5e3c" }}>Registre-se</Link>
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

export default Login

