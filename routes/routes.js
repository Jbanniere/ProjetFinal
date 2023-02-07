import express from "express"
import homeGetController from "../controller/homeGet.js"
import logInController from "../controller/login.js"
import middleware from "../controller/middleware.js"
import addProductController from "../controller/addProduct.js"
import updateProductController from "../controller/updateProduct.js"
import getAllProductController from "../controller/getAllProduct.js"
import getProductByIdController from "../controller/getProductById.js"

const router = express.Router()


// Routes pour rediriger chaque page vers les Controllers correspondants
const routesGET = [
    {route:"/", controller: homeGetController},
    {route:"/getAllProduct", controller: getAllProductController},
    
    
]
const routesPOST = [
    
    {route:"/login", controller: logInController},
    {route:"/addProduct", controller: addProductController},
    {route:"/updateProduct", controller: updateProductController},
    {route:"/getProductById", controller: getProductByIdController}
    
]
routesGET.map((item) =>{
        router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) =>{
        router.post(item.route, middleware, item.controller);
})

export default router