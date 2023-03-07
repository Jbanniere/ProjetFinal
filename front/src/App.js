
        /*Routes FRONT-ADMIN*}
        <Route path="/getAllProduct" element={<AllProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/getAllUsers" element={<AllUsers />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/updatePicture/:product_id" element={<UpdatePicture />} />
        <Route path="/getAllContactMessage" element={<AllContactMessage />} />

        {/*Routes FRONT-USERS*}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/addAvis/:product_id" element={<AddAvis />} />
        <Route path="/getAllAvis/:product_id" element={<AllAvis />} />
        <Route path="/getProfil" element={<Profil />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />


export default App;

*/

import './App.css'
import Router from "./components/Router.jsx"
import { BrowserRouter } from "react-router-dom"
import Footer from "./components/Footer.jsx"
import Header from "./components/Header.jsx"
import './slick.css';
import './slick-theme.css';


function App() {
    return (
        <BrowserRouter>
          <Header />
          <Router />
          <Footer />
        </BrowserRouter>
    )
}

export default App;
