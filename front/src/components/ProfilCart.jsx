import {useEffect, useState, useContext, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import Modal from 'react-modal'

Modal.setAppElement('#root')

const ProfilCart = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [userCart, setUserCart] = useState([])
    const [updateCart, setUpdateCart] = useState(null)
    const [qte, setQte] = useState({seul:0})
    const user_id = state.user.id
    
    // FENETRE MODALE POUR VALIDATION DELETE
    const [isModalOpen, setIsModalOpen] = useState(false) // Pour suivre si la fenêtre modale doit être affichée ou non
    const openModal = () => setIsModalOpen(true) // gestionnaires d'événements pour ouvrir et fermer la fenêtre modale
    const closeModal = () => setIsModalOpen(false)

    // Je récupère le cart du user
    useEffect(() => {
        axios.post(`${BASE_URL}/getPictByProductInCartByUserId`, {user_id})
        .then(res => setUserCart(res.data.result.result))
        .catch(err => console.log(err))
    }, [user_id])
    
    // Pour supprimer un abonnement dans le cart
    const deleteCart = (id) => {
         axios.post(`${BASE_URL}/deleteCartProduct`,{id})
         .then(res => setUserCart(userCart.filter((e)=> e.id !== id)))
    }
    
    // Pour modifier la quantité de l'abonnement
    const handleClick = (element, type) => {
        const {name} = element.target
        let quantite = qte[type]

        if(name === "add"){
            quantite++
        }
        
        if(name === "remove" && quantite > 0){
            quantite--
        }
        
        setQte({...qte, [type]:quantite})
    }
    
    // Pour Update un produit dans le cart
    const submitUpdateCart = () => {
        axios.post(`${BASE_URL}/updateCart`,{...updateCart})
            .then(res => setUserCart(res.data.result.result))
            .catch(err => console.log(err))
    }
    
    return(
        <Fragment>
        {state.user.role_id === 2 && (
            <div>    
                <h2>Mon Abonnement</h2>
                {userCart.map((cart,i) => {
                    return(
                    <div key={i}>
                        <h3>Nom du Magazine : {cart.name}</h3>
                        <img src={`${BASE_URL}/img/${cart.url}`} width = "20%" alt={cart.caption} />
                        <div>
                            <button className="product-qte" name="remove" onClick={(e) => handleClick(e,"seul")}>-</button>
                                <strong id="quantite" >{cart.quantity}</strong>
                                <button className="btn-product-qte" name="add" onClick={(e) => handleClick(e,"seul")}>+</button>
                            <p>Prix : {cart.price}€ / Mois</p>
                            <p>Montant : {Number(cart.quantity)*Number(cart.price)}€</p>
                        </div>
                        <button>Valider ma modification</button>
                        <button onClick={openModal}>Supprimer cet abonnement</button>
                        <Modal
                        isOpen={isModalOpen} // affiche la fenêtre modale si isModalOpen est true
                        onRequestClose={closeModal} // gestionnaire d'événements pour fermer la fenêtre modale
                        contentLabel="Confirmation de suppression" // une étiquette pour l'accessibilité
                        >
                            <p>Êtes-vous sûr de vouloir supprimer cet abonnement ?</p>
                            <button onClick={()=> deleteCart(cart.id)}>Oui, supprimer mon abonnement</button>
                            <button onClick={closeModal}>Annuler</button>
                        </Modal>
                    </div>
                    )
                })}
            </div>
        )}
        </Fragment>
    )
    
}

export default ProfilCart