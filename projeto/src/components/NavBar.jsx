import { Link } from "react-router";
import Plushing from "/public/Plushing.png"; // importando a imagem do logo
import React, { useState } from "react"; // Import useState

const Navbar = ({ isLoggedIn, handleLogout, cartItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu open/close

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu state
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{ backgroundColor: "#8b5e3c" }}
    >
      <div className="container" style={isMenuOpen ? {} : { height: "100px" }}>
        {/* The height is fixed only when the menu is closed */}
        <Link className="navbar-brand me-4" to="/" style={{ color: "#fff" }}>
          <img
            src={Plushing}
            alt=""
            style={{ width: "150px", height: "150px" }} // Ajuste de tamanho e posição
          />
        </Link>
        {/* botão para expandir/colapsar o menu em telas menores */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu} // Use toggleMenu function
          aria-expanded={isMenuOpen} // Update aria-expanded dynamically
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} // Dynamically add 'show' class
          id="navbarNav"
        >
          <style>
            {`
              .nav-link {
                color: #ffffff; /* Cor fixa atual */
                transition: color 0.3s;
              }
              .nav-link:hover {
                color: #b3a2a0; /* Cor ao passar o mouse */
              }
            `}
          </style>
          <ul className="navbar-nav me-auto">
            {/* links principais da barra de navegação */}
            <li className="nav-item me-3">
              <Link className="nav-link fs-5" to="/">
                Conheça
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fs-5" to="/customize">
                Customize
              </Link>
            </li>
          </ul>
          <div className="d-flex flex align-items-center">
            <div className="nav-icons d-flex  gap-3">
              {/* icone de perfil/login com dropdown para usuários logados */}
              {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link text-dark p-0 icon-btn "
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="collapse"
                    data-bs-target="#headerMenu"
                  ></button>
                  <Link
                    to={"/perfil"}
                    className="btn btn-link text-dark p-0  icon-btn"
                  >
                    <i
                      className="bi bi-person-circle"
                      style={{ color: "#fff", fontSize: "1.5rem" }} // Increased font size
                    ></i>
                  </Link>
                  <ul
                    id="headerMenu"
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      {/* link para a página de perfil */}
                      <Link className="dropdown-item" to="/perfil">
                        Meu Perfil
                      </Link>
                    </li>
                    <li>
                      {/* botão para logout */}
                      <button className="dropdown-item" onClick={handleLogout}>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                // link para a página de login caso o usuário não esteja logado
                <Link
                  to="/login"
                  className="btn btn-link text-dark p-0 me-3 icon-btn"
                >
                  <i
                    className="bi bi-person-circle"
                    style={{ color: "#fff", fontSize: "1.5rem" }} // Increased font size
                  ></i>
                </Link>
              )}
              {/* icone do carrinho com contador de itens */}
              <Link
                to="/carrinho"
                className="btn btn-link text-dark p-0 position-relative icon-btn"
              >
                <i className="bi bi-cart" style={{ color: "#fff", fontSize: "1.5rem" }} // Increased font size
                ></i>
                {cartItems > 0 && (
                  // exibe o contador de itens no carrinho se houver itens
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
