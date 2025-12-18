import { prisma } from '../app.js'

export async function createImage (filepath, user) {
    const string = filepath
    try {
        const img = await prisma.image.create({
            data: { filepath: filepath, 
                userId: user 
            },
        });
    } catch (error) {
        throw (error)
    }
}

export async function getUserImagesFilePaths(id) {
    try {
        const img = await prisma.image.findMany({
            where: {
                userId: id
            },
            include: {
                _count: {
                    select: { Like: true}
                }
            }
        });

        return img

    } catch (error) {
        throw (error)
    }
}

export async function getAImage(userId) {
    try {
        const img = await prisma.image.findFirst({
            where: {
                userId: userId
            }
        })

        return img

    } catch (error) {
        throw (error)
    }
<<<<<<< HEAD
}

export async function getAllImages() {
    try {
        const img = await prisma.image.findMany({
            include: {
                _count: {
                    select: { Like: true}
                }
            }
        })

        return img
    } catch (error) {
        throw (error)
    }
=======
>>>>>>> trab3
}