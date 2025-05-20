import { Link } from "react-router"

const Navbar = ({ isLoggedIn, handleLogout, cartItems }) => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{ backgroundColor: "#8b5e3c" }}>
      <div className="container">
        {/* inserindo logo com link para a página inicial */}
        <Link className="navbar-brand" to="/" style={{ color: "#fff" }}>
          <span className="brand-text">Plushing</span>
        </Link>
        {/* botão para expandir/colapsar o menu em telas menores */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* links principais da barra de navegação */}
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Conheça
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customize">
                Customize
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            <div className="nav-icons me-2">
              {/* icone de perfil/login com dropdown para usuários logados */}
              {isLoggedIn ? (
                <div className="dropdown">
                  <button
                    className="btn btn-link text-dark p-0 me-3 icon-btn"
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle" style={{ color: "#fff" }}></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
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
                <Link to="/login" className="btn btn-link text-dark p-0 me-3 icon-btn">
                  <i className="bi bi-person-circle" style={{ color: "#fff" }}></i>
                </Link>
              )}
              {/* icone do carrinho com contador de itens */}
              <Link to="/carrinho" className="btn btn-link text-dark p-0 position-relative icon-btn">
                <i className="bi bi-cart" style={{ color: "#fff" }}></i>
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
  )
}

export default Navbar

