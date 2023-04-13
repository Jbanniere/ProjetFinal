import { useEffect, useState, useContext, Fragment } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { StoreContext } from "../tools/context.js"
import Modal from 'react-modal'
import { formatDate } from "../tools/date.js"


Modal.setAppElement('#root')

const ProfilCart = () => {
    const [ state, dispatch ] = useContext(StoreContext)
    const [ abonnement, setAbonnement ] = useState([])
    const user_id = state.user.id
    
    // FENETRE MODALE POUR VALIDATION DELETE
    const [ isModalOpen, setIsModalOpen ] = useState(false) // Pour suivre si la fenêtre modale doit être affichée ou non
    const openModal = () => setIsModalOpen(true) // gestionnaires d'événements pour ouvrir et fermer la fenêtre modale
    const closeModal = () => setIsModalOpen(false)

    // Je récupère l'abonnement du User
    useEffect(() => {
        axios.post(`${BASE_URL}/getAbonnementByUserId`, {user_id})
            .then(res => setAbonnement(res.data.result.result))
            .catch(err => console.log(err))
    },[user_id])
    
    // Pour supprimer un abonnement dans le cart
    const handleDelete = (id) => {
         axios.post(`${BASE_URL}/deleteAbonnement`,{id})
         .then(res => {
             setAbonnement(abonnement.filter((e)=> e.id !== id))
             closeModal(true)
         })
         .catch(err => console.log(err))
    }
    
    return(
        <Fragment>
        {state.user.role_id === 2 && (
            <Fragment>    
                <h1>Mon Abonnement</h1>
                {abonnement.map((order,i) => {
                    return(
                    <div  className= "profil-abo flex" key={i}>
                        <h3>Nom du Magazine : {order.name}</h3>
                        <img className = "cart-img" src={`${BASE_URL}/img/${order.url}`} alt={order.caption} />
                        <div>
                            <p><span className="prix">{order.price}€ / Mois</span> (sans engagement)</p>
                            <p>Commande du {formatDate(order.date)}</p>
                        </div>
                        <button className="btn-delete" onClick={openModal}>Supprimer cet abonnement</button>
                        <Modal
                        isOpen={isModalOpen} // affiche la fenêtre modale si isModalOpen est true
                        onRequestClose={closeModal} // gestionnaire d'événements pour fermer la fenêtre modale
                        contentLabel="Confirmation de suppression" // une étiquette pour l'accessibilité
                        >
                            <p>Êtes-vous sûr de vouloir supprimer cet abonnement ?</p>
                            <button onClick={()=> handleDelete(order.id)}>Oui, supprimer mon abonnement</button>
                            <button onClick={closeModal}>Annuler</button>
                        </Modal>
                    </div>
                    )
                })}
            </Fragment>
        )}
        </Fragment>
    )
    
}

export default ProfilCart