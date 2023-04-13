import { BASE_URL } from '../tools/constante.js'
import { NavLink } from "react-router-dom"

const PanelAdmin = () => {
    return(
        <div className="container">
            <h1>Tableau de Bord</h1>
            <div className="tableau_de_bord">
                <div>
                    <h3>Mes Statistiques</h3>
                        <img className="stats-img" src={`${BASE_URL}/image/stats.png`} width="30%" alt="graphiques"/>
                </div>
                <div>
                    <h3>Mes Données</h3>
                        <div className="menu__gestion flex">
                            <div className="menu-gestion">
                                <NavLink to="/getAllProduct">Gestion de mes Produits</NavLink>
                            </div>
                            <div className="menu-gestion">
                                <NavLink to="/getAllUsers">Gestion de mes Utilisateurs</NavLink>
                            </div>
                            <div className="menu-gestion">
                                <NavLink to="/getAllContactMessage">Demandes de Contact</NavLink>
                            </div>
                        </div>
                </div>
            </div>
        </div>
        )
}

export default PanelAdmin