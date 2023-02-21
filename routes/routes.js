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
import middlewareUploadFile from '../controller/middlewareUploadFile.js'
import getPicturesById from "../controller/getPicturesById.js"
import getAllPicturesController from "../controller/getAllPictures.js"
import updatePictureController from "../controller/updatePicture.js"
import getPicturesByProductId from "../controller/getPicturesByProductId.js"
import contactUsController from "../controller/contactUs.js"
import getAllContactMessageController from "../controller/getAllContactMessage.js"
import deleteContactMessageController from "../controller/deleteContactMessage.js"
import updateContactEtatController from "../controller/updateContactEtat.js"
import addAvisController from "../controller/addAvis.js"
import getAllAvisByProductIdController from "../controller/getAllAvisByProductId.js"
// import addToCartController from "../controller/addToCart.js"
import getNoteByProductIdController from "../controller/getNoteByProductId.js"
import checkToken from '../controller/checkToken.js'

const router = express.Router()


// Routes pour rediriger chaque page vers les Controllers correspondants
const routesGET = [
    {route:"/", controller: homeGetController},
    {route:"/getAllProduct", controller: getAllProductController},
    {route:"/getAllUsers", controller: getAllUsersController},
    {route:"/getAllPictures", controller: getAllPicturesController},
    {route:"/getAllContactMessage", controller: getAllContactMessageController}
    
]
const routesPOST = [
    
    {route:"/login", controller: logInController},
    {route:"/updateProduct", controller: updateProductController},
    {route:"/getProductById", controller: getProductByIdController},
    {route:"/deleteProduct", controller: deleteProductController},
    {route:"/register", controller: registerController},
    {route:"/deleteUser", controller: deleteUserController},
    {route:"/updateUser", controller: updateUserController},
    {route:"/getUserById", controller: getUserById},
    {route:"/getPicturesById", controller: getPicturesById},
    {route:"/getPicturesByProductId", controller: getPicturesByProductId},
    {route:"/contactUs", controller: contactUsController},
    {route:"/deleteContactMessage", controller: deleteContactMessageController},
    {route:"/updateContactEtat", controller: updateContactEtatController},
    {route:"/addAvis", controller: addAvisController},
    {route:"/getAllAvisByProductId", controller: getAllAvisByProductIdController},
    {route:"/getNoteByProductId", controller: getNoteByProductIdController}
]

router.post("/addProduct", middlewareUploadFile, middleware, addProductController),
router.post("/updatePicture", middlewareUploadFile, middleware, updatePictureController)


routesGET.map((item) =>{
        router.get(item.route, middleware, item.controller);
})

routesPOST.map((item) =>{
        router.post(item.route, middleware, item.controller);
})

router.get("/relogged", checkToken)



export default router