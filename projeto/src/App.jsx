import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/main.scss";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProtectedRoute from "./components/ProtectedRoute";
import MetodoPagamento from "./pages/MetodoPagamento";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verifica se o usuário está logado com base no localStorage
    const user = localStorage.getItem("user");
    return user ? true : false;
  });
  
  const [cart, setCart] = useState([]); // armazenando os itens do carrinho
  
  const handleLogin = (userData) => {
    if (userData && userData.token) {
      localStorage.setItem("user", JSON.stringify(userData)); // Armazena os dados do usuário no localStorage
      setIsLoggedIn(true); // Define como logado
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove o item 'user' do localStorage
    localStorage.removeItem("isLoggedIn"); // Remove o estado de login, se necessário
    window.location.href = "/"; // Redireciona para a página inicial
  };

  const addToCart = (item) => {
    setCart([...cart, item]); // add um item ao carrinho
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <BrowserRouter>
        {" "}
        {/* fornece o contexto de roteamento */}
        <Navbar
          isLoggedIn={isLoggedIn} // estado de login
          handleLogout={handleLogout} // função de logout
          cartItems={cart.length} // número de itens no carrinho
        />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} /> {/* rota página inicial */}
            <Route
              path="/customize"
              element={<Customize addToCart={addToCart} />} // rota página de personalização com função de adicionar ao carrinho
            />
            <Route
              path="/login"
              element={
                <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} /> // rota p login
              }
            />
            <Route
              path="/registro"
              element={
                <Registro handleLogin={handleLogin} isLoggedIn={isLoggedIn} /> // rota p registro com função de login
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  {/* protege a rota do perfil */}
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carrinho"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  {" "}
                  {/* protege a rota do carrinho */}
                  <Carrinho cart={cart} setCart={setCart} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-success"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  {" "}
                  {/* protege a rota de sucesso de pagamento */}
                  <PaymentSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/metodo-pagamento"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  {" "}
                  {/* protege a rota de método de pagamento */}
                  <MetodoPagamento /> {/* componente de método de pagamento */}
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
