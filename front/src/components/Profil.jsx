import {useEffect, useState, useContext, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import Login from "./Login.jsx"
import Modal from 'react-modal'


Modal.setAppElement('#root');

const Profil = () => {
    const [userProfil, setUserProfil] = useState([])
    const [userAvis, setUserAvis] = useState([])
    const [state, dispatch] = useContext(StoreContext)
    const [userCart, setUserCart] = useState([])
    
    
    const id = state.user.id
    const user_id = state.user.id
    
    // FENETRE MODALE
    
    // Pour suivre si la fenêtre modale doit être affichée ou non
    const [isModalOpen, setIsModalOpen] = useState(false)
    // gestionnaires d'événements pour ouvrir et fermer la fenêtre modale
    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)
    

    // Je récupère les users par leur id
    useEffect(() => {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res => setUserProfil(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [id]) 
    
    // Je récupère le cart du user
    useEffect(() => {
        axios.post(`${BASE_URL}/getPictByProductInCartByUserId`, {user_id})
        .then(res => setUserCart(res.data.result.result))
        .catch(err => console.log(err))
    }, [user_id])
    
    // Je récupère les avis via le user_id
    useEffect(() => {
        axios.post(`${BASE_URL}/getAvisByUserId`,{user_id})
            .then(res => setUserAvis(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [user_id]) 
    
    
    // Pour supprimer un user
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, {id})
    }
    
    // Pour supprimer un avis
    const deleteAvis = (idAvis) => {
        console.log(idAvis)
        axios.post(`${BASE_URL}/deleteAvis`, {id:idAvis})
        .then(res => setUserAvis(userAvis.filter((e)=> e.id !== id)))
    }
    
    console.log(userAvis)
    return(
        <Fragment>
        {state.user.isLogged === true && (
            <div>
                {userProfil.map((profil,i) => {
                    return(
                    <div key={i}>
                        <h1>Hello {profil.prenom} !</h1>
                        <h2>Mes Infos</h2>
                        <p>Nom : {profil.nom}</p>
                        <p>Prénom : {profil.prenom}</p>
                        <p>Adresse : {profil.street} {profil.zip} {profil.city}</p>
                        <p>Email : {profil.email}</p>
                        <button><NavLink to={`/updateUser/${profil.id}`}>Modifier mes infos</NavLink></button>
                        <button onClick={openModal}>Supprimer mon compte</button>    
                        <Modal
                        isOpen={isModalOpen} // affiche la fenêtre modale si isModalOpen est true
                        onRequestClose={closeModal} // gestionnaire d'événements pour fermer la fenêtre modale
                        contentLabel="Confirmation de suppression" // une étiquette pour l'accessibilité
                        >
                            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                            <button onClick={()=> deleteUser(profil.id)}>Oui, supprimer mon compte</button>
                            <button onClick={closeModal}>Annuler</button>
                        </Modal>
                    </div>
                    )   
                })}
                
        {/* J'affiche les avis et les abonnements que pour les users*/}       
        {state.user.role_id === 2 && (
            <div>    
                <h2>Mes Avis</h2>
                {userAvis.map((avis,i) => {
                    return(
                    <div key={i}>
                        <h3>Nom du magazine : {avis.name}</h3>
                        <p>Ma note : {avis.note}/5</p>
                        <p>Mon message : {avis.content}</p>
                        <button onClick={()=> deleteAvis(avis.id)}>Supprimer cet avis</button>
                    </div>
                    )
                })}
                
                <h2>Mon Abonnement</h2>
                {userCart.map((cart,i) => {
                    return(
                    <div key={i}>
                        <h3>Nom du Magazine : {cart.name}</h3>
                        <p>Quantité : {cart.quantity}</p>
                        <p>Prix: {cart.price}</p>
                    </div>
                    )
                })}
            </div>
        )}
            </div>
            )}
            
        {state.user.isLogged === false && (
            <div>
                <p>Oups ! Page réservée aux membres</p>
                <p>Se connecter ou s'inscrire : </p>
                <Login />
            </div>
            )}
            
        </Fragment>
        )
}

export default Profil