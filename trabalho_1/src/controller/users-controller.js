import { select, selectOne } from "../config/db.js"
import { deletaDoBanco, editaNoBanco, exportarCSV, insereNoBanco, parcelaDeUsuarios, ordenarDados } from "../service/users-service.js";

export function mostraListaUsuarios(req, res) {
    var page = 1

    if(req.query.page) {
        page = Number(req.query.page)
    }

    const { dados, qtdDados } = parcelaDeUsuarios(page)

    const filtros = req.query
    const dadosOrdenados = ordenarDados(dados, filtros)

    const qtsPaginas = Math.ceil(qtdDados / 10)
    res.render('users-lista', { dadosOrdenados, qtsPaginas, page, qtdDados})
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
            <h1>Houve um erro ao tentar deletar o usuário.</h1>
            <p>Erro: ${err.message}</p>
            <a href="/">Voltar ao início</a>
        `);
    }
}

export function editaUsuario(req, res) {
    const data = req.body
    const id = data.id

    try {
        editaNoBanco(id, data)
        res.redirect("/")
    } catch (err) {
        res.status(500).send(`
            <h1>Houve um erro ao tentar editar o usuário.</h1>
            <p>Erro: ${err.message}</p>
            <a href="/">Voltar ao início</a>
        `);
    }
}

export function exportar(req, res) {
    exportarCSV()
    res.send(`
        <h1>ARQUIVO .CSV GERADO NA ROOT DO SERVER</h1>
        <a href="/">Voltar ao início</a>
    `)
}
