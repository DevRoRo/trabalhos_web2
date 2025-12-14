import { getUserImagesFilePaths } from "../Persistence/imageDTO.js";
import { getUserImages, getUserImagesFromUploadDir } from "./users-controller.js";


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