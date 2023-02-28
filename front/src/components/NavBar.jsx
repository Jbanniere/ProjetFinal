import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, Fragment, useState } from "react"
import {StoreContext} from "../tools/context.js"
import { BASE_URL } from "../tools/constante.js"

const NavBar = (props) => {
    const [state, dispatch] = useContext(StoreContext)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
  

    return(
        <Fragment>
        <nav className="navbar">
        
        <div className="nav_icon">
            <NavLink to="/"><img src={`${BASE_URL}/image/logo.png`} alt="logo"/></NavLink>
        </div>
            {state.user.role_id === 1 && (
            <ul className="navbar__links">
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/addProduct"> Ajouter un produit</NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/getAllProduct">Afficher tous les produits</NavLink>
                </li>  
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/getAllUsers">Afficher les utilisateurs</NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/getAllContactMessage">Demandes de contact</NavLink>
                </li>
            </ul>
                )}
            <ul className="navbar__links"> 
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/">Nos Mensuels</NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/register">S'inscrire</NavLink>
                </li>
                 <li className="navbar__item">
                    <NavLink className="navbar__link" to="/login">Se connecter</NavLink>
                </li>
                <li className="navbar__item">
                    <NavLink className="navbar__link" to="/contactUs">Nous contacter</NavLink>
                </li>
            </ul>
            <button className="navbar__burger">
                <span className="burger-nav"></span>
            </button>
            <div>
                <NavLink to="/getProfil"><img src={`${BASE_URL}/image/lapin.png`} width="110px" height="80px" alt="lapin pour profil"/></NavLink>
                <NavLink to="/cart"><img src={`${BASE_URL}/image/cart.png`} width="60px" height="60px" alt="img add to cart"/></NavLink>
                {state.isLogged === false && (
                <button><NavLink to="/login">S'identifier</NavLink></button>)}
                {state.isLogged === true && (
                <button><NavLink to="/logout">Se Déconnecter</NavLink></button>)}
            </div>
        </nav>
        </Fragment>
        )
}

export default NavBar