import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookies.js";

// Configuração dinâmica da URL do servidor com namespace "/usuarios"
const socket = io(
  window.location.hostname === "localhost"
    ? "http://localhost:3000/usuarios" // URL do servidor local com namespace
    : "https://websocket-ao8f.onrender.com/usuarios", // URL do servidor no Render com namespace
  {
    auth: {
      token: obterCookie("tokenJwt"),
    },
  }
);

socket.on("connect_error", (erro) => {
  alert(erro);
  window.location.href = "/login/index.html";
});

socket.emit("obter_documentos", (documentos) => {
  documentos.forEach((documento) => {
    inserirLinkDocumento(documento.nome);
  });
});

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
  inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
  alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
  removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
