import { encode } from "../jwt/jwt-encode.js";
import { User } from "../Entities/user.js";
import { secureHash } from "../Utilities/secureHash.js"

const SALT_ROUNDS = 10

export class UserService {

    // injetar o repository
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }

    // objeto é o tal do DTO 
    async createUser({ name, cpf, email, password}) {

        const hashObj = await secureHash.create(password, SALT_ROUNDS)

        const user = new User(null, name, cpf, email, hashObj);

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

    async login({ email, password }) {
        const user = await this.usersRepository.buscar(email);
        const userHash = new secureHash(user.password)
        console.log(user)

        if (!user) {
            throw new Error('Esse endereço de email não pertence a nenhum usuário')
        }
        
        if (!await userHash.verifyPassword(password)) {
            throw new Error('Senha inválida')
        }
        
        const jwt = encode({name: user.firstname, email: user.email})

        return { jwt, user }
  
    }

}