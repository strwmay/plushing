import React, { useState } from "react";

const Cartao = () => {
  const [editando, setEditando] = useState(false);
  const [numeroCartao, setNumeroCartao] = useState("");
  const [nomeImpresso, setNomeImpresso] = useState("");
  const [validade, setValidade] = useState("");
  const [codigoSeguranca, setCodigoSeguranca] = useState("");
  const [erroNumeroCartao, setErroNumeroCartao] = useState("");
  const [erroValidade, setErroValidade] = useState("");
  const [erroCodigoSeguranca, setErroCodigoSeguranca] = useState("");

  const validarNumeroCartao = (numero) => {
    const regex = /^\d{16}$/; // Verifica se o número do cartão tem exatamente 16 dígitos
    return regex.test(numero);
  };

  const validarValidade = (data) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Verifica se a validade está no formato MM/AA
    return regex.test(data);
  };

  const validarCodigoSeguranca = (codigo) => {
    const regex = /^\d{3}$/; // Verifica se o código de segurança tem exatamente 3 dígitos
    return regex.test(codigo);
  };

  const salvarAlteracoes = () => {
    if (!validarNumeroCartao(numeroCartao)) {
      setErroNumeroCartao("Número do cartão inválido. Deve conter 16 dígitos.");
      return;
    }
    if (!validarValidade(validade)) {
      setErroValidade("Validade inválida. Use o formato MM/AA.");
      return;
    }
    if (!validarCodigoSeguranca(codigoSeguranca)) {
      setErroCodigoSeguranca("Código de segurança inválido. Deve conter 3 dígitos.");
      return;
    }

    // Lógica para salvar as alterações
    console.log("Alterações salvas:", { numeroCartao, nomeImpresso, validade, codigoSeguranca });
    setErroNumeroCartao("");
    setErroValidade("");
    setErroCodigoSeguranca("");
    setEditando(false);
  };

  return (
    <div className="card flex-grow-1 rounded-4">
      <h3 className="mt-3 fw-bold text-center">Cartão</h3>

      <div className="card-body">
        {/* Número do Cartão */}
        <div className="d-flex justify-content-between align-items-center gap-4">
          <h5 className="card-title">Número do Cartão</h5>
          {editando ? (
            <div className="w-100">
              <input
                maxLength={16}
                type="text"
                className={`rounded-5 form-control ${erroNumeroCartao ? "is-invalid" : ""}`}
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (!validarNumeroCartao(numeroCartao)) {
                    setErroNumeroCartao("Número do cartão inválido. Deve conter 16 dígitos.");
                  } else {
                    setErroNumeroCartao("");
                  }
                }}
              />
              {erroNumeroCartao && <div className="invalid-feedback">{erroNumeroCartao}</div>}
            </div>
          ) : (
            <p className="card-text">{numeroCartao || "Seu número do cartão aqui"}</p>
          )}
        </div>
        <hr />

        {/* Nome Impresso no Cartão */}
        <div className="d-flex justify-content-between align-items-center gap-4">
          <h5 className="card-title">Nome Impresso</h5>
          {editando ? (
            <input
              type="text"
              className="rounded-5 form-control"
              value={nomeImpresso}
              onChange={(e) => setNomeImpresso(e.target.value)}
            />
          ) : (
            <p className="card-text">{nomeImpresso || "Seu nome aqui"}</p>
          )}
        </div>
        <hr />

        {/* Validade */}
        <div className="d-flex justify-content-between align-items-center gap-4">
          <h5 className="card-title">Validade</h5>
          {editando ? (
            <div className="w-100">
              <input
                type="text"
                className={`rounded-5 form-control ${erroValidade ? "is-invalid" : ""}`}
                value={validade}
                onChange={(e) => setValidade(e.target.value)}
                onBlur={() => {
                  if (!validarValidade(validade)) {
                    setErroValidade("Validade inválida. Use o formato MM/AA.");
                  } else {
                    setErroValidade("");
                  }
                }}
              />
              {erroValidade && <div className="invalid-feedback">{erroValidade}</div>}
            </div>
          ) : (
            <p className="card-text">{validade || "MM/AA"}</p>
          )}
        </div>
        <hr />

        {/* Código de Segurança */}
        <div className="d-flex justify-content-between align-items-center gap-4">
          <h5 className="card-title">Código de Segurança</h5>
          {editando ? (
            <div className="w-100">
              <input
                maxLength={3}
                type="text"
                className={`rounded-5 form-control ${erroCodigoSeguranca ? "is-invalid" : ""}`}
                value={codigoSeguranca}
                onChange={(e) => setCodigoSeguranca(e.target.value)}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onBlur={() => {
                  if (!validarCodigoSeguranca(codigoSeguranca)) {
                    setErroCodigoSeguranca("Código de segurança inválido. Deve conter 3 dígitos.");
                  } else {
                    setErroCodigoSeguranca("");
                  }
                }}
              />
              {erroCodigoSeguranca && <div className="invalid-feedback">{erroCodigoSeguranca}</div>}
            </div>
          ) : (
            <p className="card-text">{codigoSeguranca || "XXX"}</p>
          )}
        </div>
        <hr />

        {/* Botões */}
        <div className="d-flex justify-content-end gap-3">
          {editando ? (
            <>
              <button
                className="btn btn-success px-4 rounded-3"
                onClick={salvarAlteracoes}
              >
                Salvar
              </button>
              <button
                className="btn btn-secondary px-4 rounded-3"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              className="btn btn-success px-4 rounded-3"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cartao;