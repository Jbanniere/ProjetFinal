import {useEffect, useState, useContext, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"

const PanelAdmin = () => {
    return(
        <Fragment>
            <h2>Tableau de Bord</h2>
            <div className="tableau_de_bord">
                <div>
                    <h3>Mes Statistiques</h3>
                        <img src={`${BASE_URL}/image/stats.png`} width="30%" alt="graphiques"/>
                </div>
                <div>
                    <h3>Mes Données</h3>
                        <ul className="menu__paneladmin">
                            <li>
                                <NavLink to="/getAllProduct">Gestion de mes produits & avis utilisateurs</NavLink>
                            </li>
                            <li>
                                <NavLink to="/getAllUsers">Gestion de mes utilisateurs</NavLink>
                            </li>
                            <li>
                                <NavLink to="/getAllContactMessage">Ma Messagerie</NavLink>
                            </li>
                        </ul>
                </div>
            </div>
        </Fragment>
        )
}

export default PanelAdmin