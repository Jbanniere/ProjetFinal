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
                    <NavLink to="/addUser"> Add User </NavLink>
                </li>
                <li>
                    <NavLink to="/addArticle"> Add Article </NavLink>
                </li>
                <li>
                    <NavLink to="/addComm"> Add Commentaire </NavLink>
                </li>
                <li>
                    <NavLink to="/users"> Afficher Users </NavLink>
                </li>
                <li>
                    <NavLink to="/article"> Afficher Articles </NavLink>
                </li>
                <li>
                    <NavLink to="/comm"> Afficher Commentaires</NavLink>
                </li>
                <li>
                    <NavLink to="/login"> Se Connecter </NavLink>
                </li>
                <li>
                    <NavLink to="/logout"> Se Déconnecter </NavLink>
                </li>
                <li>
                    <NavLink to="/profil"> Mon Profil </NavLink>
                </li>
                <li>
                    <NavLink to="/uploadFile"> Télécharger fichier </NavLink>
                </li>
            </ul>
        </nav>
        )
}

export default NavBar