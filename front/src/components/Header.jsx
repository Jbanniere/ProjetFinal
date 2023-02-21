import {BASE_URL} from "../tools/constante.js"
import NavBar from "./NavBar.jsx"
import { NavLink } from "react-router-dom"
import {useState, useContext} from "react"
import {StoreContext} from "../tools/context.js"

const Header = () => {
    const [state, dispatch] = useContext(StoreContext)

    return(
        <header>
            <img src={`${BASE_URL}/image/logo.png`} alt="logo"/>
            <NavBar />
            <div>
                <NavLink to="/getProfil"><img src={`${BASE_URL}/image/lapin.png`} width="10%" alt="lapin pour profil"/></NavLink>
                <img src={`${BASE_URL}/image/cart.png`} width="5%" alt="img add to cart"/>
                {state.isLogged === false && (
                <button><NavLink to="/login">S'identifier</NavLink></button>)}
                {state.isLogged === true && (
                <button><NavLink to="/logout">Se Déconnecter</NavLink></button>)}
            </div>
    
                
            
        </header>
        
        )
    
}

export default Header