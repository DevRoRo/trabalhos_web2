import { UserService } from "../Services/users-services.js";

/**
 * 
 */
export class AuthController {

    // validar os dados e encaminhar para "dentro" do service
    /**
     * 
     * @param {UserService} service 
     */
    constructor(service) {
        this.service = service;
    }

    async login(req, res) {
        // validacao de payload
        const input = req.body;
        
        // chamada ao service
        const output = await this.service.login(input);

        // a resposta http filtrando os possiveis
        if (output) {
            return res.status(200).json(output);
        }

        return res.status(400).json({msg: "credenciais invalidas"})
    }
}