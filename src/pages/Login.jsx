import React, { useState } from "react";
import { Link, Navigate } from "react-router";

const Login = ({ handleLogin }) => {
  const navigate = Navigate(); // Hook para navegação
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://plushing.somee.com/Users/login?useCookies=false&useSessionCookies=false",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao realizar login.");
        return;
      }

      const data = await response.json();
      setError(null);
      setIsLoggedIn(true); // Atualiza o estado de login
      handleLogin(data); // Chama a função de login passada como prop

      // armazenar no LocalStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("email", email); // Armazena o email no LocalStorage
      localStorage.setItem("isLoggedIn", "true");
      console.log("Login bem-sucedido:", data);

      //redirecionar para a página inicial após o login
      navigate("/"); // Redireciona para a página inicial
    } catch (err) {
      setError("Erro de conexão com o servidor.", err);
    }
  };

  return (
    <div className="login-page py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 cute-heading">Entrar</h2>

                {error && (
                  <div
                    className="alert alert-danger rounded-pill"
                    role="alert"
                    style={{ backgroundColor: "#d9a679", color: "#5a3e2b" }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control rounded-pill"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control rounded-pill"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Lembrar de mim
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="btn w-100 rounded-pill"
                    style={{ backgroundColor: "#8b5e3c", color: "#fff" }}
                  >
                    Entrar
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Não tem uma conta?{" "}
                    <Link to="/registro" style={{ color: "#8b5e3c" }}>
                      Registre-se
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
