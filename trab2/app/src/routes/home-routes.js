import { Router } from "express"
import { showHomepage } from "../Controller/home-controller.js"

const homeRouter = Router()

homeRouter.get("/page", showHomepage)

export { homeRouter }