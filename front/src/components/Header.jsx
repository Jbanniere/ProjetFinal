import {BASE_URL} from "../tools/constante.js"
import {Fragment} from "react"
import NavBar from "./NavBar.jsx"
import { NavLink } from "react-router-dom";
import {StoreContext} from "../tools/context.js"
import {useState, useContext, useEffect} from "react"


const Header = () => {

    return(
        <Fragment>
            <img src={`${BASE_URL}/image/logo.png`} alt="logo"/>
            <NavBar />
            <div>
                <NavLink to="/getProfil"> <img src={`${BASE_URL}/image/lapin.png`} width="10%" alt="lapin pour profil"/></NavLink>
                <img src={`${BASE_URL}/image/cart.png`} width="5%" alt="img add to cart"/>
            </div>
            
        </Fragment>
        
        )
    
}

export default Header