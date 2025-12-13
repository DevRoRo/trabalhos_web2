import { insert, deleteOne, selectOne, select } from "../config/db.js";

export function insereNoBanco(data) {

    var date = new Date();
    var dia = date.getDate()
    var mes = date.getMonth()+1
    var ano = date.getFullYear()

    var createdAt = dia + "/" + mes + "/" + ano

    var username = "@"+data.name.substring(0, 4)

    insert(data.name, username, data.role, data.status, data.email, data.password, createdAt)
}

export function deletaDoBanco(id) {
    try {
        deleteOne(Number(id))
    } catch (err) {
        throw err
    }
}

export function editaNoBanco(id, dadosParaEditar) {
    const user = selectOne(Number(id))

    user.name = dadosParaEditar.name
    user.username = dadosParaEditar.name.substring(0, 4)
    user.email = dadosParaEditar.email
    user.role = dadosParaEditar.role
    user.status = dadosParaEditar.status
    user.password = dadosParaEditar.password
}

export function parcelaDeUsuarios(page) {
    var dados = select();
    const qtdDados = dados.length
    var quantosUserMostrar = page * 10
    dados = dados.slice(quantosUserMostrar-10, quantosUserMostrar)
    return {
        dados: dados,
        qtdDados: qtdDados
    }
}   
