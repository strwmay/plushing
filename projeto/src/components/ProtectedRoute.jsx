import { Navigate } from "react-router"

// componente para proteger rotas que exigem autenticação
const ProtectedRoute = ({ isLoggedIn, children }) => {
  // redireciona para a página de login se o usuário não estiver logado
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  // renderiza o conteúdo protegido se o usuário estiver logado
  return children
}

export default ProtectedRoute
