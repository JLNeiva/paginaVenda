// utils/exibirMensagem.ts

export function exibirMensagem(mensagem: string, cor: string = "#d1fae5") {
    const mensagemDiv = document.createElement("div");
    mensagemDiv.innerText = mensagem;
  
    Object.assign(mensagemDiv.style, {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      background: cor,
      color: "#333",
      padding: "15px 20px",
      borderRadius: "5px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: "9999",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      minWidth: "200px",
      maxWidth: "90%",
    });
  
    document.body.appendChild(mensagemDiv);
    setTimeout(() => mensagemDiv.remove(), 3000);
  }
  