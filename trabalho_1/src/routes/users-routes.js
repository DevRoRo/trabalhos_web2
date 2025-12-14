import { Router } from "express"
import { mostraListaUsuarios, mostraPaginaCriacaoUsuario, criaUsuario, deletaUsuario, mostraPaginaEdicao, editaUsuario, exportar } from "../controller/users-controller.js";

const usersRouter = Router();

const respostaPadrao = (req, res) => { res.send("FUNCIONA") };

usersRouter.get('/lista',  mostraListaUsuarios);
usersRouter.get('/criar',  mostraPaginaCriacaoUsuario);
usersRouter.post('/criar', criaUsuario);
usersRouter.get('/edit',   mostraPaginaEdicao);
usersRouter.post('/edit',  editaUsuario);
usersRouter.get('/delete', deletaUsuario);
usersRouter.get('/export', exportar)

export  { usersRouter }