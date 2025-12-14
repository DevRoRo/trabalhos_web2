import { formidable } from 'formidable'
import path from 'path'
import { promises as fs } from 'fs'
import { createUser, findUser } from "../Persistence/userDTO.js"
import { createImage, getAImage, getUserImagesFilePaths } from '../Persistence/imageDTO.js'

export async function teste(req, res) {
    const username = 'roro'
    const userId = await findUser(username)
    console.log(await getUserImagesFilePaths(userId.id))
}

export function showPublishInterface(req, res) {
    res.render('publish')
}

export function publishImage(req, res) {
    const form = formidable({
        uploadDir: `public/uploads/${req.session.username}/`,
        createDirsFromUploads: true,
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        const filepath = files.imagem[0].filepath.slice(61) //Gambiarra pra pegar o pathing relativo da imagem e salvar no banco.
        const user = (await findUser(req.session.username)).id
        createImage(filepath, user)
        res.redirect("/")
    });
}

export async function getUserImages(username) {
    const userId = await findUser(username).id
    return await getUserImagesFilePaths(userId)
}

export async function getUserImagesFromUploadDir(req) {
    const username = req.session.username
    const uploadDir = path.relative('/', '/public/uploads/'+username)
    const images = await fs.readdir(uploadDir)
    return images
}

export async function userAuthentication(req, res) {
    try {
        const { username, password } = req.body;

        const user = await findUser(username);

        if (user.password === password) {
            req.session.auth = true;
            req.session.username = user.username;
            res.redirect('/');
        } else {
            throw new Error("Senha incorreta")
        }

    } catch (error) {
        console.error(error);
        if(error.message == "Senha incorreta") {
            res.send('<h1>Senha incorreta.</h1><br><a href="/users/userLogin">Tente novamente</a>');

        } else if (error.message == "Usuário não encontrado") {
            res.send('<h1>Usuário não encontrado.</h1><br><a href="/users/userLogin">Tente novamente</a>');
        } else {
            res.status(500).send("Ocorreu um erro no servidor.");
        }
    }
}

export function userLogout(req, res) {
    req.session.auth = false
    res.redirect("/")
}

export function showAuthForm (req, res) {
    res.render('authScreen')
}

export function showLoginScreen(req, res) {
    res.render('loginScreen')
}

export const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        createUser(username, password)
        res.redirect('/')
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export function showReqData(req, res) {
    req.session.auth = true
    req.session.abcd = 1234
    return res.json({
        rota: req.url,
        queryparams: req.query,
        method: req.method,
        ip: req.ip,
        session: {
            ...req.session,
            sessionId: req.sessionID,
            sessionAuth: req.session.auth 
        }
    })
}