import express from "express"
import homeGetController from "../controller/homeGet.js"
import contactGetController from "../controller/contactGet.js"
import contactPostController from "../controller/contactPost.js"

const router = express.Router()


// Routes pour rediriger chaque page vers les Controllers correspondants

router.get('/', homeGetController)

router.get('/contact', contactGetController)

router.post('/contact', contactPostController)

export default router