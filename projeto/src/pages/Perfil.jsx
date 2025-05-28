import { useEffect, useState } from "react"; // Import useEffect

// Componente de perfil do usuário
const Perfil = () => {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    name: "", // Inicializa o nome vazio
    email: "", //inicia com o email q estava n login
    phone: "",
    address: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("devlogin")); // Recupera o email do localStorage
    if (storedUser && storedUser.email) {
      const userName = storedUser.email.split("@")[0]; // Extrai o nome do email
      setUserData((prevData) => ({ ...prevData, name: userName, email: storedUser.email })); // Atualiza o nome e email no estado
    }
  }, []);

  const [isEditing, setIsEditing] = useState(false); // Estado para alternar entre visualização e edição
  const [formData, setFormData] = useState({ ...userData }); // Estado para armazenar os dados do formulário

  // Atualiza os dados do formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Salva as alterações feitas no formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...formData }); // Atualiza os dados do usuário
    setIsEditing(false); // Sai do modo de edição
  };

  // Dados fictícios de pedidos do usuário
  const orders = [
    { id: "1001", date: "10/04/2023", status: "Entregue", total: 89.9 },
    { id: "1002", date: "25/05/2023", status: "Em produção", total: 129.8 },
    { id: "1003", date: "12/06/2023", status: "Em transporte", total: 99.9 },
  ];

  return (
    <div className="profile-page py-5">
      <div className="container">
        <h1 className="mb-4 cute-heading">Meu Perfil</h1>
        
        <div className="row">
          {/* Seção de informações do perfil */}
          <div className="col-md-4 mb-4">
            <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f5e4d3" }}>
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  {/* Avatar do usuário */}
                  <div
                    className="avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      fontSize: "2rem",
                      backgroundColor: "#ffb8cc",
                      color: "#fff",
                    }}
                  >
                    {userData.name.charAt(0).toUpperCase()}
                  </div>
                  <h5 className="cute-heading">Olá, {userData.name}!</h5> {/* Exibe o nome do usuário */}
                  <p className="text-muted">{userData.email}</p>
                </div>

                {/* Exibe informações ou formulário de edição */}
                {!isEditing ? (
                  <>
                    <div className="mb-3">
                      <strong>Telefone:</strong> {userData.phone}
                    </div>
                    <div className="mb-3">
                      <strong>Endereço:</strong> {userData.address}
                    </div>
                    <button className="btn w-100 rounded-pill" style={{ backgroundColor: "#8b5e3c", color: "#fff" }} onClick={() => setIsEditing(true)}>
                      Editar Perfil
                    </button>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Nome
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Telefone
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Endereço
                      </label>
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn flex-grow-1 rounded-pill" style={{ backgroundColor: "#8b5e3c", color: "#fff" }}>
                        Salvar
                      </button>
                      <button
                        type="button"
                        className="btn flex-grow-1 rounded-pill"
                        style={{ backgroundColor: "#d9a679", color: "#5a3e2b" }}
                        onClick={() => {
                          setFormData({ ...userData }); // Restaura os dados originais
                          setIsEditing(false); // Sai do modo de edição
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Seção de pedidos do usuário */}
          <div className="col-md-8">
            <div className="card border-0 shadow-sm rounded-4" style={{ backgroundColor: "#f5e4d3" }}>
              <div className="card-header bg-transparent border-0">
                <h5 className="mb-0 cute-heading">Meus Pedidos</h5>
              </div>
              <div className="card-body">
                {orders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Pedido</th>
                          <th>Data</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.date}</td>
                            <td>
                              {/* Exibe o status do pedido com cores diferentes */}
                              <span
                                className={`badge rounded-pill ${
                                  order.status === "Entregue"
                                    ? "bg-success"
                                    : order.status === "Em transporte"
                                      ? "bg-info"
                                      : "bg-warning"
                                }`}
                                style={{ backgroundColor: order.status === "Entregue" ? "#8b5e3c" : "#d9a679", color: "#fff" }}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td>R$ {order.total.toFixed(2)}</td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary rounded-pill">Detalhes</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center py-3">Você ainda não fez nenhum pedido.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;

