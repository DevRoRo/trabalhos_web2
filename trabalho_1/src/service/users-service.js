import { insert, deleteOne } from "../config/db.js";

export function insereNoBanco(data) {

    var data = new Date();
    var dia = data.getDate()
    var mes = data.getMonth()+1
    var ano = data.getFullYear()

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