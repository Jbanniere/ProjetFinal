import { NavLink } from "react-router-dom";
import {useEffect} from 'react'
import axios from 'axios'

const NavBar = (props) => {
    useEffect(() => {
    if(!axios.defaults.headers.common['Authorization']){
      const token = localStorage.getItem("jwtToken")
      if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer '+token
      }
    }
  },[])
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/addProduct"> Ajouter un produit </NavLink>
                </li>
                <li>
                    <NavLink to="/getAllProduct">Afficher tous les produits </NavLink>
                </li>
                <li>
                    <NavLink to="/register">S'inscrire</NavLink>
                </li>
                 <li>
                    <NavLink to="/getAllUsers">Afficher les utilisateurs</NavLink>
                </li>
                 <li>
                    <NavLink to="/login">Se connecter</NavLink>
                </li>
                 <li>
                    <NavLink to="/logout">Se déconnecter</NavLink>
                </li>
                <li>
                    <NavLink to="/contactUs">Nous contacter</NavLink>
                </li>
                <li>
                    <NavLink to="/getAllContactMessage">Demandes de contact</NavLink>
                </li>
            </ul>
        </nav>
        )
}

export default NavBar