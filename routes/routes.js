import express from "express"
import homeGetController from "../controller/homeGet.js"
import logInController from "../controller/login.js"
import middleware from "../controller/middleware.js"
import addProductController from "../controller/addProduct.js"
import updateProductController from "../controller/updateProduct.js"
import getAllProductController from "../controller/getAllProduct.js"
import getProductByIdController from "../controller/getProductById.js"
import deleteProductController from '../controller/deleteProduct.js'
import registerController from "../controller/register.js"
import getAllUsersController from "../controller/getAllUsers.js"
import deleteUserController from '../controller/deleteUser.js'
import updateUserController from "../controller/updateUser.js"
import getUserById from "../controller/getUserById.js"

const router = express.Router()


// Routes pour rediriger chaque page vers les Controllers correspondants
const routesGET = [
    {route:"/", controller: homeGetController},
    {route:"/getAllProduct", controller: getAllProductController},
    {route:"/getAllUsers", controller: getAllUsersController},
    
    
    
]
const routesPOST = [
    
    {route:"/login", controller: logInController},
    {route:"/addProduct", controller: addProductController},
    {route:"/updateProduct", controller: updateProductController},
    {route:"/getProductById", controller: getProductByIdController},
    {route:"/deleteProduct", controller: deleteProductController},
    {route:"/register", controller: registerController},
    {route:"/deleteUser", controller: deleteUserController},
    {route:"/updateUser", controller: updateUserController},
    {route:"/getUserById", controller: getUserById}
    
    
    
    
]
routesGET.map((item) =>{
        router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) =>{
        router.post(item.route, middleware, item.controller);
})

export default router