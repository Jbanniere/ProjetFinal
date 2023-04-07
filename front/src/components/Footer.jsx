import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitterSquare, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { BASE_URL } from '../tools/constante.js'

const Footer = () => {
   
    
    return(
            <footer className="footer">
                <img className="apple-footer" src={`${BASE_URL}/image/apple-bye.png`} alt="pomme qui fait bye"/>
            
                <div className="footer__icons">
                    Suivez-nous sur les réseaux : 
                        <div className="footer-icons">
                            <NavLink to="/" title="Nous rejoindre sur Facebook"><FontAwesomeIcon className="facebook-svg"  icon={faFacebook} /></NavLink>
                            <NavLink to="/" title="Nous rejoindre sur Twitter"><FontAwesomeIcon className="twitter-svg" icon={faTwitterSquare} /></NavLink>
                            <NavLink to="/" title="Nous rejoindre sur Insragram"><FontAwesomeIcon className="insta-svg" icon={faInstagram} /></NavLink>
                            <NavLink to="/" title="Accéder à notre page Youtube"><FontAwesomeIcon className="youtube-svg" icon={faYoutube} /></NavLink>
                        </div>
                </div>
                
            <hr />
                <div className="footer__nav">
                <p>Plan du Site :</p>
                    <ul className="footer-nav">
                        <li><NavLink to="/" title="Accéder à la page d'Accueil">- Home</NavLink></li>
                        <li><NavLink to="/register" title="Accéder à la page d'inscription">- S'inscrire</NavLink></li>
                        <li><NavLink to="/getProfil" title="Accéder à mon profil">- Mon Profil</NavLink></li>
                        <li><a href="tel:0233445566" title="Nous contacter par téléphone">- Service Client : 02 33 44 55 66 </a></li>
                        <li><NavLink to="/mentionsLegales" title="Accéder aux mentions légales">- Mentions Légales</NavLink></li>
                    </ul>
                </div>
            </footer>
        )
}

export default Footer