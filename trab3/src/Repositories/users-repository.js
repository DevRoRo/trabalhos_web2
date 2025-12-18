import { User } from "../Entities/user.js";

export class UsersRepository {

    // injetando a conexao do banco no repository
    constructor(dbCon) {
        this.dbCon = dbCon;
    }

    async salvar(user) {
        await this.dbCon.user.create({
            data: {
                id: user.id,
                firstname: user.firstname,
                surname: user.surname,
                cpf: user.cpf,
                email: user.email,
                password: user.password.getHash()
            }
        });
    }

    async buscar(email) {
        const data = await this.dbCon.user.findUnique({
            where: {
                email
            }
        })
        console.log({
            data
        })
               
        if (data) {
            const user = new User(data.id, `${data.firstname} ${data.surname}`, data.cpf, data.email, data.password);
            return user;
        }

        return null;
    }

}