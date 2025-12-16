import { encode } from "../jwt/jwt-encode.js";
import { User } from "../Entities/user.js";


export class UserService {

    // injetar o repository
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    // objeto é o tal do DTO 
    async createUser({ name, cpf, email, password}) {
        // cria um objeto do tipo usuario
        const user = new User(null, name, cpf, email, password);

        // passa o objeto para o repository salvar no banco
        // isso pode gerar erros (unique keys)
        try {
            await this.usersRepository.salvar(user);
            return user;
        } catch (error) {
            console.log(error)
            throw new Error('nao foi possivel criar o usuario')
        }
    }

    async login(email, senha) {
        const user = await this.usersRepository.buscar(email);
        console.log(user)

        if (!user) {
            // nao encontrou usuario
            // throw new Error()
            return null;
        }

        if (!user.checkPassword(user.password)) {
            return null;
        }
        // monta o jwt
        const jwt = encode({name: user.firstname, email: user.email})

        return { jwt, user }
  
    }

}