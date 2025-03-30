import { definirCookie } from "../utils/cookies.js";

const socket = io("https://websocket-ao8f.onrender.com/usuarios", {
    transports: ["websocket"],  // Garante que está usando WebSockets
    reconnection: true,         // Ativa reconexão automática
    reconnectionAttempts: 10,   // Tenta reconectar até 10 vezes
    reconnectionDelay: 500      // Tenta reconectar a cada 500ms
});

function emitirAutenticarUsuario(dados) {
    socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
    definirCookie("tokenJwt", tokenJwt);

    alert("Usuário autenticado com sucesso!");
    window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("Erro na autenticação."));
socket.on("usuario_nao_encontrado", () => alert("Usuário não encontrado."));

export { emitirAutenticarUsuario };
