import { encontrarUsuario } from "../db/usuariosDb.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
    socket.on("autenticar_usuario", async ({ nome, senha }) => {
        console.log("Evento autenticar_usuario chamado com:", { nome, senha });

        const usuario = await encontrarUsuario(nome);

        if (usuario) {
            const autenticado = autenticarUsuario(senha, usuario);

            if (autenticado) {
                const tokenJwt = gerarJwt({ nomeUsuario: nome });

                console.log("Autenticação bem-sucedida para o usuário:", nome);
                socket.emit("autenticacao_sucesso", tokenJwt);
            } else {
                console.log("Erro de autenticação: senha inválida para o usuário:", nome);
                socket.emit("autenticacao_erro");
            }
        } else {
            console.log("Usuário não encontrado:", nome);
            socket.emit("usuario_nao_encontrado");
        }
    });
}

export default registrarEventosLogin;
