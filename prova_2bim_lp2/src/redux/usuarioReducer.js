import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ESTADO from '../recursos/estado';
import { buscarMsgs } from './mensagemReducer'
const urlBase = 'https://backend-bcc-2-b.vercel.app/usuario';
export const buscarUsuarios = createAsyncThunk('usuario/buscarUsuarios', async (_, { dispatch }) => {
    try {
        const msgsResponse = await dispatch(buscarMsgs());

        if (msgsResponse.payload.status) {
            const resposta = await fetch(urlBase, { method: 'GET' });
            const dados = await resposta.json();

            if (dados.status) {
                const usuariosFormatados = dados.listaUsuarios.map(usuario => {
                    
                    return {
                        id: usuario.id,
                        nickname: usuario.nickname,
                        urlAvatar: usuario.urlAvatar,
                        dataIngresso: usuario.dataIngresso,
                        mensagens: msgsResponse.payload.listaMensagens.filter(msg => msg.usuario.id === usuario.id)
                    };
                });

                return {
                    status: true,
                    listaUsuarios: usuariosFormatados,
                    mensagem: ''
                };
            } else {
                return {
                    status: false,
                    listaUsuarios: [],
                    mensagem: 'Ocorreu um erro ao recuperar os usuários da base de dados.'
                };
            }
        } else {
            return {
                status: false,
                listaUsuarios: [],
                mensagem: 'Ocorreu um erro ao recuperar as mensagens da base de dados.'
            };
        }
    } catch (erro) {
        return {
            status: false,
            listaUsuarios: [],
            mensagem: 'Ocorreu um erro ao recuperar os usuários da base de dados: ' + erro.message
        };
    }
});

export const adicionarUsuario = createAsyncThunk('usuario/adicionar', async (usuario) => {
    try {
        const resposta = await fetch(urlBase, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nickname: usuario.nome,
                urlAvatar: usuario.avatar
            })
        });
        const dados = await resposta.json();

        if (resposta.ok) {
            return {
                status: dados.status,
                usuario: dados.id,
                mensagem: 'Usuário incluído com sucesso!'
            };
        } else {
            return {
                status: dados.status,
                mensagem: 'Ocorreu um erro ao adicionar o usuário.',
                usuario: dados // ou ajuste conforme necessário
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: 'Ocorreu um erro ao adicionar o usuário: ' + erro.message,
            usuario: {} // ou ajuste conforme necessário
        };
    }
});

const initialState = {
    estado: ESTADO.OCIOSO,
    mensagem: "",
    usuarios: [],
};

const usuarioSlice = createSlice({
    name: 'usuario',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(buscarUsuarios.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Buscando usuarios...";
            })
            .addCase(buscarUsuarios.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.usuarios = action.payload.usuarios;
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(buscarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.error.message;
            })
            .addCase(adicionarUsuario.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.usuarios.push(action.payload.usuario);
                state.mensagem = action.payload.mensagem;
            })
            .addCase(adicionarUsuario.pending, (state, action) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Adicionando usuario...";
            })
            .addCase(adicionarUsuario.rejected, (state, action) => {
                state.mensagem = "Erro ao adicionar a usuario: " + action.error.message;
                state.estado = ESTADO.ERRO;
            })

    }
});

export default usuarioSlice.reducer;