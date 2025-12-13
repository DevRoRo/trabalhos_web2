let db = [
    {
        id: 1,
        name: "Vinicius Fritzen Machado",
        username: "@vfmachado",
        role: "ADMIN",
        status: "ACTIVE",
        email: "vinicius.machado@riogrande.ifrs.edu.br",
        password: "1234",
        createdAt: "2025-08-26"
    },
    {
        id: 2,
        name: "Theodoro Araujo Fritzen",
        username: "@theo",
        role: "ADMIN",
        status: "DELETED",
        email: "vinicius.machado@riogrande.ifrs.edu.br",
        password: "12345",
        createdAt: "2025-08-26"
    },
    {
        id: 3,
        name: "David Maiato",
        username: "@david",
        role: "STUDENT",
        status: "INACTIVE",
        email: "david.maioto@aluno.riogrande.ifrs.edu.br",
        password: "123456",
        createdAt: "2025-08-26"
    },
    {id: 4,
    name: "Maria Silva",
    username: "@msilva",
    role: "TEACHER",
    status: "ACTIVE",
    email: "maria.silva@riogrande.ifrs.edu.br",
    password: "password4",
    createdAt: "2025-08-27"
    },
    {
        id: 5,
        name: "João Pereira",
        username: "@jpereira",
        role: "STUDENT",
        status: "ACTIVE",
        email: "joao.pereira@aluno.riogrande.ifrs.edu.br",
        password: "password5",
        createdAt: "2025-08-27"
    },
    {
        id: 6,
        name: "Ana Souza",
        username: "@asouza",
        role: "STUDENT",
        status: "INACTIVE",
        email: "ana.souza@aluno.riogrande.ifrs.edu.br",
        password: "password6",
        createdAt: "2025-08-28"
    },
    {
        id: 7,
        name: "Pedro Santos",
        username: "@psantos",
        role: "TEACHER",
        status: "ACTIVE",
        email: "pedro.santos@riogrande.ifrs.edu.br",
        password: "password7",
        createdAt: "2025-08-28"
    },
    {
        id: 8,
        name: "Carla Oliveira",
        username: "@coliveira",
        role: "ADMIN",
        status: "ACTIVE",
        email: "carla.oliveira@riogrande.ifrs.edu.br",
        password: "password8",
        createdAt: "2025-08-29"
    },
    {
        id: 9,
        name: "Ricardo Gomes",
        username: "@rgomes",
        role: "STUDENT",
        status: "ACTIVE",
        email: "ricardo.gomes@aluno.riogrande.ifrs.edu.br",
        password: "password9",
        createdAt: "2025-08-29"
    },
    {
        id: 10,
        name: "Juliana Costa",
        username: "@jcosta",
        role: "STUDENT",
        status: "INACTIVE",
        email: "juliana.costa@aluno.riogrande.ifrs.edu.br",
        password: "password10",
        createdAt: "2025-08-30"
    },
    {
        id: 11,
        name: "Fernando Lima",
        username: "@flima",
        role: "STUDENT",
        status: "ACTIVE",
        email: "fernando.lima@aluno.riogrande.ifrs.edu.br",
        password: "password11",
        createdAt: "2025-08-30"
    },
    {
        id: 12,
        name: "Patricia Rocha",
        username: "@procha",
        role: "TEACHER",
        status: "ACTIVE",
        email: "patricia.rocha@riogrande.ifrs.edu.br",
        password: "password12",
        createdAt: "2025-08-31"
    },
    {
        id: 13,
        name: "Guilherme Alves",
        username: "@galves",
        role: "STUDENT",
        status: "ACTIVE",
        email: "guilherme.alves@aluno.riogrande.ifrs.edu.br",
        password: "password13",
        createdAt: "2025-08-31"
    },
    {id: 14,
        name: "Maria Silva",
        username: "@msilva",
        role: "TEACHER",
        status: "ACTIVE",
        email: "maria.silva@riogrande.ifrs.edu.br",
        password: "password4",
        createdAt: "2025-08-27"
    },
    {
        id: 15,
        name: "João Pereira",
        username: "@jpereira",
        role: "STUDENT",
        status: "ACTIVE",
        email: "joao.pereira@aluno.riogrande.ifrs.edu.br",
        password: "password5",
        createdAt: "2025-08-27"
    },
    {
        id: 16,
        name: "Ana Souza",
        username: "@asouza",
        role: "STUDENT",
        status: "INACTIVE",
        email: "ana.souza@aluno.riogrande.ifrs.edu.br",
        password: "password6",
        createdAt: "2025-08-28"
    },
    {
        id: 17,
        name: "Pedro Santos",
        username: "@psantos",
        role: "TEACHER",
        status: "ACTIVE",
        email: "pedro.santos@riogrande.ifrs.edu.br",
        password: "password7",
        createdAt: "2025-08-28"
    },
    {
        id: 18,
        name: "Carla Oliveira",
        username: "@coliveira",
        role: "ADMIN",
        status: "ACTIVE",
        email: "carla.oliveira@riogrande.ifrs.edu.br",
        password: "password8",
        createdAt: "2025-08-29"
    },
    {
        id: 19,
        name: "Ricardo Gomes",
        username: "@rgomes",
        role: "STUDENT",
        status: "ACTIVE",
        email: "ricardo.gomes@aluno.riogrande.ifrs.edu.br",
        password: "password9",
        createdAt: "2025-08-29"
    },
    {
        id: 20,
        name: "Juliana Costa",
        username: "@jcosta",
        role: "STUDENT",
        status: "INACTIVE",
        email: "juliana.costa@aluno.riogrande.ifrs.edu.br",
        password: "password10",
        createdAt: "2025-08-30"
    },
    {
        id: 21,
        name: "Fernando Lima",
        username: "@flima",
        role: "STUDENT",
        status: "ACTIVE",
        email: "fernando.lima@aluno.riogrande.ifrs.edu.br",
        password: "password11",
        createdAt: "2025-08-30"
    },
    {
        id: 22,
        name: "Patricia Rocha",
        username: "@procha",
        role: "TEACHER",
        status: "ACTIVE",
        email: "patricia.rocha@riogrande.ifrs.edu.br",
        password: "password12",
        createdAt: "2025-08-31"
    },
    {
        id: 23,
        name: "Guilherme Alves",
        username: "@galves",
        role: "STUDENT",
        status: "ACTIVE",
        email: "guilherme.alves@aluno.riogrande.ifrs.edu.br",
        password: "password13",
        createdAt: "2025-08-31"
    }
]

export function select() {
    return [...db];
}

export function selectOne(id) {
    return db.find(user => user.id === id)
}

export function insert(name, username, role, status, email, password, createdAt) {

    db.push({
        id: db.length+1,
        name: name,
        username: username,
        role: role,
        status: status,
        email: email,
        password: password,
        createdAt: createdAt 
    })
}

export function deleteOne(id) {

    if (db.find(user => user.id === id).role === "ADMIN") {
        throw new Error("Não pode deletar usuário ADMIN")
    } else {
        db = db.filter(user => user.id !== id)
    }
}