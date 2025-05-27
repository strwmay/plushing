import React from 'react' 
import 'bootstrap-icons/font/bootstrap-icons.css' // importandp os ícones do bootstrap

const Footer = () => {
  return (
    <footer className="py-4" style={{ backgroundColor: "#8b5e3c", color: "#fff" }}> 
      {/* rodapé com estilo de cores e padding */}
      <div className="container"> 
        {/* lista de links para redes sociais */}
        <ul className="list-inline text-center d-flex justify-content-center align-items-center gap-3">
          <li className="list-inline-item d-flex align-items-center overflow-hidden">
            <hr className="d-none d-md-inline-block mx-4" style={{ width: '700px' }} />
            <a href="https://www.youtube.com/@Steam" target="_blank" rel="noopener noreferrer">
              <img src="/youtube.svg" alt="YouTube" width="24" height="24"  />
            </a>
          </li>
          <li className="list-inline-item d-flex align-items-center">
            <a href="https://www.instagram.com/steam__tr/" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.svg" alt="Instagram" width="24" height="24"  />
            </a>
          </li>
          <li className="list-inline-item d-flex align-items-center">
            <a href="https://github.com/strwmay/devSteam" target="_blank" rel="noopener noreferrer">
              <img src="/github.svg" alt="GitHub" width="24" height="24"  />
            </a>
          </li>
          <li className="list-inline-item d-flex align-items-center overflow-hidden">
            <a href="https://www.figma.com/design/hw3MevGX78GTBJzRzEpISe/Projeto-1---Fernanda?node-id=0-1&t=EudwILF32W1YNhLp-1" target="_blank" rel="noopener noreferrer">
              <img src="/figma.svg" alt="Figma" width="24" height="24"  />
            </a>
            <hr className="d-none d-md-inline-block mx-4" style={{ width: '700px' }} />
          </li>
        </ul>
        {/* texto de copyright centralizado */}
        <div className="pt-4 w-100 d-flex flex-column align-items-center">
          <p className="mt-2"><span>Copyright © 2025 Plushing</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer // exporta o componente Footer