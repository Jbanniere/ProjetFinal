import { useEffect, useState, useContext, Fragment } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { NavLink } from "react-router-dom"
import { StoreContext } from "../tools/context.js"
import Modal from 'react-modal'

Modal.setAppElement('#root')


const ProfilUser = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [userProfil, setUserProfil] = useState([])
    const id = state.user.id


// FENETRE MODALE POUR VALIDATION DELETE
    const [isModalOpen, setIsModalOpen] = useState(false) // Pour suivre si la fenêtre modale doit être affichée ou non
    const openModal = () => setIsModalOpen(true) // gestionnaires d'événements pour ouvrir et fermer la fenêtre modale
    const closeModal = () => setIsModalOpen(false)
    
 // Je récupère les users par leur id
    useEffect(() => {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res => setUserProfil(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [id]) 

// Pour supprimer un user
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, {id})
        closeModal(true)
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
    }
    
    return(
        <Fragment>
        {state.user.isLogged && (
            <div>
                {userProfil.map((profil,i) => {
                    return(
                    <div key={i}>
                        <h1>Hello {profil.prenom} !</h1>
                        <button className="btn-logout"><NavLink to="/logout">Me Déconnecter</NavLink></button>
                        <h2>Mes Infos</h2>
                        <div className= "profil">
                            <p>Nom : {profil.nom}</p>
                            <p>Prénom : {profil.prenom}</p>
                            <p>Adresse : {profil.street} {profil.zip} {profil.city}</p>
                            <p>Email : {profil.email}</p>
                        </div>
                        <button className="btn-update"><NavLink to={`/updateUser/${profil.id}`}>Modifier mon profil</NavLink></button>
                        <button className="btn-delete" onClick={openModal}>Supprimer mon compte</button>    
                        <Modal
                        isOpen={isModalOpen} // affiche la fenêtre modale si isModalOpen est true
                        onRequestClose={closeModal} // gestionnaire d'événements pour fermer la fenêtre modale
                        contentLabel="Confirmation de suppression" // une étiquette pour l'accessibilité
                        >
                            <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                            <button className="btn-delete" onClick={()=> deleteUser(profil.id)}>Oui, supprimer mon compte</button>
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

export default ProfilUser