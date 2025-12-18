import crypto from 'crypto';

// ENTITY - tem as regras de usuário
export class User {
    constructor(id, name, cpf, email, password) {
        // o id pode vir do banco ou precisa ser criado
        if (id) {
            this.id = id;
        } else {
            this.id = crypto.randomUUID();
        }
        
        // valida nome
        name = name.trim();
        const [firstname, surname] = name.split(' ');

        if (firstname.length < 3) throw Error('Nome invalido');
        if (surname.length < 3) throw Error('Sobrenome invalido');

        this.firstname = firstname;
        this.surname = surname;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }
}