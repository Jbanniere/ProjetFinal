import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddProduct from "./components/AddProduct.jsx"
import UpdateProduct from "./components/UpdateProduct.jsx"
import AllProduct from "./components/AllProduct.jsx"
import Register from "./components/Register.jsx"
import AllUsers from "./components/AllUsers.jsx"
import UpdateUser from "./components/UpdateUser.jsx"
import Login from "./components/Login.jsx"
import Logout from "./components/Logout.jsx"
import UpdatePicture from "./components/UpdatePicture.jsx"
import Footer from "./components/Footer.jsx"
import ContactUs from "./components/ContactUs.jsx"
import AllContactMessage from "./components/AllContactMessage.jsx"
import ProductDetails from "./components/ProductDetails.jsx"
import AddAvis from "./components/AddAvis.jsx"
import AllAvis from "./components/AllAvis.jsx"
import Header from "./components/Header.jsx"
import Profil from "./components/Profil.jsx"
import Home from "./components/Home.jsx"

//pour faire fonctionner fontawesome, rajouter:
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"*/


function App() {
  
  
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      
        {/*Routes FRONT-ADMIN*/}
        <Route path="/getAllProduct" element={<AllProduct />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />
        <Route path="/getAllUsers" element={<AllUsers />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/updatePicture/:product_id" element={<UpdatePicture />} />
        <Route path="/getAllContactMessage" element={<AllContactMessage />} />

        {/*Routes FRONT-USERS*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/addAvis/:product_id" element={<AddAvis />} />
        <Route path="/getAllAvis/:product_id" element={<AllAvis />} />
        <Route path="/getProfil" element={<Profil />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

