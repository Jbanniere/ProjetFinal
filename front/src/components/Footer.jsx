import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitterSquare, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"

const Footer = () => {
   
    
    return(
            <footer>
                <div>
                    <p>Suivez-nous sur : 
                        <FontAwesomeIcon icon={faFacebook} /><FontAwesomeIcon icon={faTwitterSquare} />
                        <FontAwesomeIcon icon={faInstagram} /><FontAwesomeIcon icon={faYoutube} />
                    </p>
                </div>
                <div>
                Plan du Site :
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/register">S'inscrire</NavLink></li>
                        <li><NavLink to="/getProfil">Mon Profil</NavLink></li>
                        <li><NavLink to="/mentionsLegales">Mentions Légales</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/">Home</NavLink></li>
                    </ul>
                </div>
            </footer>
        )
}

export default Footer