import { select, selectOne } from "../config/db.js"
import { deletaDoBanco, insereNoBanco } from "../service/users-service.js";

export function mostraListaUsuarios(req, res) {
    const dados = select();
    res.render('users-lista', { dados })
}

export function mostraPaginaCriacaoUsuario(req, res) {
    res.render('users-create');
}

export function mostraPaginaEdicao(req, res) {
    const dados = selectOne(Number(req.query.id))
    res.render('users-edit', { dados })
}

export function criaUsuario(req, res) {
    const data = req.body
    console.log(data)
    insereNoBanco(data)
    res.redirect("/")
}

export function deletaUsuario(req, res) {
    try {
        deletaDoBanco(req.query.id)
        res.redirect("/")
    } catch (err) {
        console.log(err)
        res.status(500).send(`
            <h1>Erro: ${err.message}</h1>
            <p>Houve um erro ao tentar deletar o usuário.</p>
            <a href="/">Voltar ao início</a>
        `);
    }
}
