import { NavLink } from "react-router-dom";
import axios from 'axios'
import { useContext, useEffect, Fragment, useState } from "react"
import { StoreContext } from "../tools/context.js"
import { BASE_URL } from "../tools/constante.js"

const NavBar = (props) => {
    const [state, dispatch] = useContext(StoreContext)
    const [showLinks, setShowLinks] = useState(false)
    
    const handleShowLinks = () => {
        setShowLinks(!showLinks)
    }
    
    const handleClickLink = () => {
        setShowLinks(false)
    }

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
            <nav className={`navbar ${showLinks ? "show-nav" : "hide-nav"}`} >
            
            <div className="navbar__logo">
                <NavLink to="/"><img className="img-logo" src={`${BASE_URL}/image/pressemia.png`} alt="logo"/></NavLink>
            </div>
            <ul className="navbar__links">
                {/*<NavLink className="navbar__link" to="/" onClick={handleClickLink}><img src={`${BASE_URL}/image/logo.svg`} alt="logo"/></NavLink>*/}
                
                {/* NAVBAR ADMIN */}
                {state.user.role_id === 1 && (
                <Fragment>
                    <li className="navbar__item">
                        <NavLink className="navbar__link" to="/getAllProduct" onClick={handleClickLink}>Mes Produits</NavLink>
                    </li>  
                    <li className="navbar__item">
                        <NavLink className="navbar__link" to="/getAllUsers" onClick={handleClickLink}>Mes Utilisateurs</NavLink>
                    </li>
                    <li className="navbar__item">
                        <NavLink className="navbar__link" to="/getAllContactMessage" onClick={handleClickLink}>Ma Messagerie</NavLink>
                    </li>
                </Fragment>
                    )}
                
                {/* NAVBAR ALL USERS*/}
                    <li className="navbar__item">
                        <NavLink className="navbar__link" to="/" onClick={handleClickLink}>Nos Mensuels</NavLink>
                    </li>
                    {state.user.isLogged && (
                     <li className="navbar__item">
                        <NavLink className="navbar__link" to="/getProfil" onClick={handleClickLink}>Mon Profil</NavLink>
                    </li>
                    )}
                    {state.user.isLogged === false && (
                    <Fragment>
                        <li className="navbar__item">
                            <NavLink className="navbar__link" to="/register" onClick={handleClickLink}>S'inscrire</NavLink>
                        </li>
                        <li className="navbar__item">
                            <NavLink className="navbar__link" to="/login" onClick={handleClickLink}>Se Connecter</NavLink>
                        </li>
                    </Fragment>
                    )}
                    <li className="navbar__item">
                        <NavLink className="navbar__link" to="/contactUs" onClick={handleClickLink}>Nous contacter</NavLink>
                    </li>
                </ul>
                <button className="navbar__burger" onClick={handleShowLinks}>
                    <span className="burger-bar"></span>
                </button>
                <div className="navbar__icons">
                    <NavLink className="icons-navbar-flex" to="/getProfil"><img className="nav_img_profil" src={`${BASE_URL}/image/girafe.png`} alt="girafe pour profil"/></NavLink>
                    {state.user.isLogged && (
                        <NavLink className="icons-navbar-flex" to="/cart"><img className="nav_img_cart" src={`${BASE_URL}/image/cart.png`} alt="img add to cart"/></NavLink>
                    )}
                    {state.user.isLogged === false && (
                        <NavLink className="icons-navbar-flex" to="/login"><img className="nav_img_cart" src={`${BASE_URL}/image/cart.png`}alt="img add to cart"/></NavLink>
                    )}
                </div>
            </nav>
        </Fragment>
        )
}

export default NavBar