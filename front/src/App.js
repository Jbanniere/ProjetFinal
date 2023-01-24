import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar.jsx"
import ErrorPage from "./components/ErrorPage.jsx"

/* pour faire fonctionner fontawesome, rajouter:
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; => exemple pour ajouter le picto "trash"*/


function App() {
  
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="*" element = {<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

