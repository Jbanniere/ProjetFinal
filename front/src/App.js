import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx"
import AddProduct from "./components/AddProduct.jsx"

/* pour faire fonctionner fontawesome, rajouter:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; => exemple pour ajouter le picto "trash"*/


function App() {
  
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

