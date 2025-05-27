import React, { useState } from "react";

const Pix = () => {
  const [pixCode, setPixCode] = useState("");

  // Gera um código Pix aleatório ao carregar o componente
  React.useEffect(() => {
    const generatedPixCode = `PIX-${Math.random().toString(36).substr(2, 10).toUpperCase()}`;
    setPixCode(generatedPixCode);
  }, []);

  return (
    <div>
      <h3>Pagar com Pix</h3>
      <p>Use o código abaixo para realizar o pagamento via Pix:</p>
      <div className="alert alert-info text-center">
        <strong>{pixCode}</strong>
      </div>
      <h5>Instruções:</h5>
      <ol>
        <li>Copie o código acima.</li>
        <li>Acesse o app do seu banco.</li>
        <li>Escolha a opção "Pagar com Pix".</li>
        <li>Cole o código e finalize o pagamento.</li>
      </ol>
    </div>
  );
};

export default Pix;