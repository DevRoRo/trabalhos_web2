import { getAllImages, getUserImagesFilePaths } from "../Persistence/imageDTO.js";
import { getUserImages, getUserImagesFromUploadDir } from "./users-controller.js";
import { findUser } from "../Persistence/userDTO.js"
import { createLike } from "../Persistence/likeDTO.js"


export async function showHomepage(req, res) {
    try {
        const username = req.session.username
        const images = await getUserImages(username)
        res.render('home', { username, images });
    } catch(error) {
        console.log(error)
        res.redirect('/users/publish') //gambiarra pra evitar erro ao criar novo usuário sem pasta com imagens
    }
}

export async function showFeedPage(req, res) {
    const imagesDb = await getAllImages()
    const images = imagesDb.map(img => ({
        id: img.id,
        filepath: img.filepath,
        titulo: img.titulo,
        userId: img.userId,
        Like: img._count.Like
    }));
    res.render('feed', { images })
}

export async function curtir(req, res) {
    const userId = (await findUser(req.session.username)).id
    const imageId = Number(req.body.imageId)
    try {
        createLike(userId, imageId)
        res.redirect('/home/feed')
    } catch(err) {
        res.redirect('/home/feed')
    }
}