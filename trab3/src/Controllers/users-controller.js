import { decode } from "../jwt/jwt-decode.js";
import { UserService } from "../Services/users-services.js";

/**
 * 
 */
export class UserController {

    // validar os dados e encaminhar para "dentro" do service
    /**
     * 
     * @param {UserService} service 
     */
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        // valida o payload / extratifica / cria o dto
        const input = req.body;
        // chama o service / use-case
        const output = await this.service.createUser(input);

        // monta o response
        res.json(output);
    }


    async getProfile(req, res) {
        const token = req.headers.authorization;
        try {
            const data = decode(token);
            res.json(data)
        }  catch (error) {
            res.status(400).json({msg: 'token invalido'})
        }
        
    }
}