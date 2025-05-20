import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router"; // Corrigido o pacote de importação
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/main.scss";

// Componentes
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Perfil from "./pages/Perfil";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Navbar
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          cartItems={cart.length}
        />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/customize"
              element={<Customize addToCart={addToCart} />}
            />
            <Route
              path="/login"
              element={
                <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/registro"
              element={
                <Registro handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carrinho"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Carrinho cart={cart} setCart={setCart} />
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
