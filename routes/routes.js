import express from "express"
import homeGetController from "../controller/homeGet.js"
import logInController from "../controller/login.js"
import middleware from "../controller/middleware.js"
import addProductController from "../controller/addProduct.js"

const router = express.Router()


// Routes pour rediriger chaque page vers les Controllers correspondants
const routesGET = [
    {route:"/", controller: homeGetController}
]
const routesPOST = [
    
    {route:"/login", controller: logInController},
    {route:"/addProduct", controller: addProductController}
]
routesGET.map((item) =>{
        router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) =>{
        router.post(item.route, middleware, item.controller);
})

export default router