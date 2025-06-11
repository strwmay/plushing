import React, { useState, useEffect } from "react";

const Perfil = () => {
  // Estado para armazenar os dados do usuário
  const [userData, setUserData] = useState({
    name: "", // Inicializa o nome vazio
    email: "", // Inicia com o email que estava no login
    phone: "",
    cpf: "", // Substitui o campo "address" por "cpf"
  });
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar o modo de edição
  const [error, setError] = useState(null); // Estado para armazenar erros

  useEffect(() => {
    const email = localStorage.getItem("email"); //

    setUserData((prevData) => ({ ...prevData, email: email || "" }));
    if (email) {
      fetch(`https://plushing.somee.com/api/Acoes/verificar-cliente/${email}`, {
        method: "GET",
        headers: {
          accept: "*/*",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json(); // Retorna os dados do cliente
          } else if (response.status === 204) {
            setIsEditing(true); // Ativa o modo de edição
            return null;
          } else {
            throw new Error("Erro ao verificar cliente.");
          }
        })
        .then((data) => {
          if (data) {
            setUserData({
              name: data.nome || "",
              email: data.email || email, // Usa o email do cliente ou o do localStorage
              phone: data.telefone || "",
              cpf: data.cpf || "", // Adiciona o CPF retornado pelo servidor
            });
          }
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        });
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    // Recuperar o email salvo no LocalStorage email
    const email = localStorage.getItem("email"); // Usa o email do localStorage ou do estado

    console.log(email);

    fetch(`https://plushing.somee.com/api/Acoes/cadastar-perfil/${email}`, {
      method: "PUT", // Altera o método para PUT
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify({
        nome: userData.name, // Dados do formulário
        telefone: userData.phone,
        cpf: userData.cpf || "", // Adiciona o CPF
      }),
    })
      .then((response) => {
        if (response.ok) {
          setIsEditing(false); // Sai do modo de edição após salvar
        } else {
          throw new Error("Erro ao salvar os dados.");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };

  return (
    <div className="perfil-page py-5">
      <div className="container">
        <h2 className="text-center mb-4">Perfil</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        {isEditing ? (
          <div>
            <h3>Editar Perfil</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled // Email não pode ser editado
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Telefone
                </label>
                <input
                  type="text"
                  id="phone"
                  className="form-control"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cpf" className="form-label">
                  CPF
                </label>
                <input
                  type="text"
                  id="cpf"
                  className="form-control"
                  value={userData.cpf}
                  onChange={(e) =>
                    setUserData({ ...userData, cpf: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Salvar
              </button>
            </form>
          </div>
        ) : (
          <div>
            <p>
              <strong>Nome:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Telefone:</strong> {userData.phone}
            </p>
            <p>
              <strong>CPF:</strong> {userData.cpf}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(true)}
            >
              Editar Perfil
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
