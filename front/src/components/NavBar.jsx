import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, Fragment} from "react"
import {StoreContext} from "../tools/context.js"

const NavBar = (props) => {
    const [state, dispatch] = useContext(StoreContext)

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
        <nav>
            <ul>
            {state.user.role_id === 1 && (
            <div>
                <li>
                    <NavLink to="/addProduct"> Ajouter un produit admin</NavLink>
                </li>
                <li>
                    <NavLink to="/getAllProduct">Afficher tous les produits admin</NavLink>
                </li>  
                <li>
                    <NavLink to="/getAllUsers">Afficher les utilisateurs admin </NavLink>
                </li>
                <li>
                    <NavLink to="/getAllContactMessage">Demandes de contact admin</NavLink>
                </li>
            </div>
                )}
                
                <li>
                    <NavLink to="/"> Home </NavLink>
                </li>
                <li>
                    <NavLink to="/register">S'inscrire</NavLink>
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
                
            </ul>
        </nav>
        </Fragment>
        )
}

export default NavBar