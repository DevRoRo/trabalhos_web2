import { Router } from "express"
import { showHomepage, showFeedPage, curtir } from "../Controller/home-controller.js"

const homeRouter = Router()

homeRouter.get("/page", showHomepage)
homeRouter.get('/feed', showFeedPage)
homeRouter.post('/feed', curtir)

export { homeRouter }