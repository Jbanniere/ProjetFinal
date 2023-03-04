import AddProduct from "../components/AddProduct.jsx"
import UpdateProduct from "../components/UpdateProduct.jsx"
import AllProduct from "../components/AllProduct.jsx"
import Register from "../components/Register.jsx"
import AllUsers from "../components/AllUsers.jsx"
import UpdateUser from "../components/UpdateUser.jsx"
import Login from "../components/Login.jsx"
import Logout from "../components/Logout.jsx"
import UpdatePicture from "../components/UpdatePicture.jsx"
import ContactUs from "../components/ContactUs.jsx"
import AllContactMessage from "../components/AllContactMessage.jsx"
import ProductDetails from "../components/ProductDetails.jsx"
import AddAvis from "../components/AddAvis.jsx"
import AllAvis from "../components/AllAvis.jsx"
import Profil from "../components/Profil.jsx"
import Home from "../components/Home.jsx"
import Error404 from '../components/Error404.jsx'
import MentionsLegales from '../components/MentionsLegales.jsx'
import Cart from '../components/Cart.jsx'
import OrderSuccess from "../components/OrderSuccess.jsx"

const routes = [
    {path:"/getAllProduct", component:<AllProduct />, auth:"admin"},
    {path:"/addProduct", component:<AddProduct />, auth:"admin"},
    {path:"/updateProduct/:id", component:<UpdateProduct />, auth:"admin"},
    {path:"/getAllUsers", component:<AllUsers />, auth:"admin"},
    {path:"/updateUser/:id", component:<UpdateUser />},
    {path:"/updatePicture/:product_id", component:<UpdatePicture />, auth:"admin"},
    {path:"/getAllContactMessage", component:<AllContactMessage />, auth:"admin"},
    {path:"/", component:<Home />},
    {path:"/login", component:<Login />},
    {path:"/register", component:<Register />},
    {path:"/logout", component:<Logout />},
    {path:"/contactUs", component:<ContactUs />},
    {path:"/addAvis/:product_id", component:<AddAvis />, auth:"user"},
    {path:"/getAllAvis/:product_id", component:<AllAvis />},
    {path:"/getProfil", component:<Profil />},
    {path:"/productDetails/:id", component:<ProductDetails />},
    {path:"/mentionsLegales", component:<MentionsLegales />},
    {path:"/cart", component:<Cart />},
    {path:"/orderSuccess", component:<OrderSuccess />},
    {path:"/*", component:<Error404 />}
    
]

export default routes