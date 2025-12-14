import { prisma } from '../app.js'


export async function createLike(userId, imageId) {
    try {
        const like = await prisma.like.create({
            data: { userId, imageId }
        })
    } catch(err) {
        if(err.code === 'P2002') {
            await prisma.like.delete({
                where: {
                    userId_imageId: { // This uses the @@unique index from your schema
                        userId: parseInt(userId),
                        imageId: parseInt(imageId)
                    }
                }
            });
        }
    }
}