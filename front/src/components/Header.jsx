import {BASE_URL} from "../tools/constante.js"
import NavBar from "./NavBar.jsx"
import { NavLink } from "react-router-dom"
import {useState, useContext} from "react"
import {StoreContext} from "../tools/context.js"

const Header = () => {
    const [state, dispatch] = useContext(StoreContext)

    return(
        <header>
            <NavBar />
        </header>
        
        )
    
}

export default Header