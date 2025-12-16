import { Poll } from "../Entities/poll.js";

export class pollsRepository {

    // injetando a conexao do banco no repository
    constructor(dbCon) {
        this.dbCon = dbCon;
    }

    async salvar(poll) {
        await this.dbCon.poll.create({
            data: {

            }
        });
    }

    async buscar(email) {
        const data = await this.dbCon.poll.findUnique({
            where: {
                
            }
        })
        console.log({
            data
        })
               
        if (data) {
            const poll = new Poll();
            return poll;
        }

        return null;
    }

}