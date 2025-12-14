import { prisma } from '../app.js'

export async function createUser (username, password) {
    try {
        const user = await prisma.user.create({
            data: { username, password },
        });
    } catch (error) {
        throw (error)
    }
}

export async function findUser(username) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })

        if (!user) {
            throw new Error("Usuário não encontrado")
        }

        return user

    } catch (error) {
        throw (error)
    }
}
