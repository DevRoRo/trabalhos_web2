import { Router } from "express"
import { showAuthForm, publishImage, register, showPublishInterface, showReqData, userAuthentication, showLoginScreen, userLogout, teste } from "../Controller/users-controller.js"

const usersRouter = Router()

usersRouter.get('/publish', showPublishInterface)
usersRouter.post('/publish', publishImage)
usersRouter.get('/userAuth', showAuthForm)
usersRouter.post('/userAuth', register)
usersRouter.get('/userLogin', showLoginScreen)
usersRouter.post('/userLogin', userAuthentication)
usersRouter.get('/userdata', showReqData)
usersRouter.get('/logout', userLogout)
usersRouter.get('/teste', teste)


export {usersRouter}