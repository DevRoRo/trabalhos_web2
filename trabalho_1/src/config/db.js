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
    }
]

export function select() {
    console.log(db)
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