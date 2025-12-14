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

export async function getUserImagesFilePaths(userId) {
    try {
        const img = await prisma.image.findMany({
            where: {
                userId: userId
            },
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
}

/* Next steps: rendering the uint8array bytes saved in the image column of the image table in a HTML page */