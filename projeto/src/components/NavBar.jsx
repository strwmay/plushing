import { Link, useNavigate } from "react-router"; // Importa useNavigate
import Plushing from "/public/Plushing.png";
import React, { useState } from "react";

const Navbar = ({ isLoggedIn, handleLogout, cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleConhecaClick = () => {
    navigate("/"); // Navega para a página inicial (Home)
    setTimeout(() => {
      const element = document.getElementById("comoFunciona");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Rola até a div alvo
      }
    }, 100); // Atraso para garantir que a navegação seja concluída
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "#8b5e3c" }}
    >
      <div className="container" style={isMenuOpen ? {} : { height: "100px" }}>
        <Link className="navbar-brand me-4" to="/" style={{ color: "#fff" }}>
          <img
            src={Plushing}
            alt=""
            style={{ width: "150px", height: "150px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item me-3">
              <button
                className="nav-link fs-5 btn btn-link p-0"
                onClick={handleConhecaClick} // Usa o manipulador de clique
              >
                Conheça
              </button>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/customize">
                Customize
              </Link>
            </li>
          </ul>
          <div className="d-flex flex align-items-center">
            <div className="nav-icons d-flex gap-3">
              {
                localStorage.getItem("user") ? (
                  <>
                    <div className="dropdown">
                      <button
                        className="btn btn-link text-dark p-0 icon-btn"
                        type="button"
                        id="profileDropdown"
                        data-bs-toggle="collapse"
                        data-bs-target="#headerMenu"
                      ></button>
                      <Link
                        to={"/perfil"}
                        className="btn btn-link text-dark p-0 icon-btn"
                      >
                        <i
                          className="bi bi-person-circle"
                          style={{ color: "#fff", fontSize: "1.5rem" }}
                        ></i>
                      </Link>
                      <ul
                        id="headerMenu"
                        className="dropdown-menu dropdown-menu-end"
                        aria-labelledby="profileDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/perfil">
                            Meu Perfil
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <Link
                      to="/carrinho"
                      className="btn btn-link text-dark p-0 position-relative icon-btn"
                    >
                      <i
                        className="bi bi-cart"
                        style={{ color: "#fff", fontSize: "1.5rem" }}
                      ></i>
                      {cartItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartItems}
                        </span>
                      )}
                    </Link>
                    <button
                      className="btn btn-link text-light p-0 fs-5"
                      onClick={handleLogout}
                    >
                      Sair
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/carrinho"
                      className="btn btn-link text-dark p-0 position-relative icon-btn"
                    >
                      <i
                        className="bi bi-cart"
                        style={{ color: "#fff", fontSize: "1.5rem" }}
                      ></i>
                      {cartItems > 0 && (
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cartItems}
                        </span>
                      )}
                    </Link>
                    <Link
                      to="/login"
                      className="btn btn-link text-light p-0 fs-5"
                    >
                      Entrar
                    </Link>
                  </>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
