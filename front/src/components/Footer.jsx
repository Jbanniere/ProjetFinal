import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitterSquare, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
   
    
    return(
            <footer>
                <div>
                    <p>Suivez-nous sur : 
                        <NavLink to="/"><FontAwesomeIcon icon={faFacebook} /></NavLink>
                        <NavLink to="/"><FontAwesomeIcon icon={faTwitterSquare} /></NavLink>
                        <NavLink to="/"><FontAwesomeIcon icon={faInstagram} /></NavLink>
                        <NavLink to="/"><FontAwesomeIcon icon={faYoutube} /></NavLink>
                    </p>
                </div>
                <div>
                Plan du Site :
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/register">S'inscrire</NavLink></li>
                        <li><NavLink to="/getProfil">Mon Profil</NavLink></li>
                        <li><NavLink to="/mentionsLegales">Mentions Légales</NavLink></li>
                    </ul>
                </div>
            </footer>
        )
}

export default Footer