import { useEffect, useState, Fragment, useContext } from "react"
import { StoreContext } from "../tools/context.js"
import { NavLink } from  "react-router-dom"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import { formatDate } from "../tools/date.js"

const OrderSuccess = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [abonnement, setAbonnement] = useState([])
    const user_id = state.user.id


    // Je récupère l'abonnement du User
    useEffect(() => {
        axios.post(`${BASE_URL}/getAbonnementByUserId`, {user_id})
            .then(res => setAbonnement(res.data.result.result))
            .catch(err => console.log(err))
    },[user_id])
    

    return(
        <div className="order-success">
          
            <h1>Merci pour votre confiance {state.user.prenom}!</h1>
                
            
            <div className="error-txt">
                <p >Vous pouvez <span className="underline">gérer votre abonnement</span> à tout moment dans l'onglet <NavLink to="/getProfil" title="Accéder à mon profil"><span className="underline">"Mon Profil"</span></NavLink></p>
                <button><NavLink to="/home" title="Accéder à la page d'accueil">Retour à la page d'Accueil</NavLink></button>
            </div>
        </div>)
}

export default OrderSuccess

/* 
<h2>Récapitulatif de votre commande</h2>
            {abonnement.map((order,i) => {
                return(
                <div className="profil" key={i}>
                    <img src={`${BASE_URL}/img/${order.url}`} alt={"couverture mensuel"} />
                    <p>Commande du {formatDate(order.date)}</p>
                    <p>Nom du Mensuel : {order.name}</p>
                    <p>Prix : {order.price} € / Mois (sans engagement)</p>
                </div>
                )
            })}
*/