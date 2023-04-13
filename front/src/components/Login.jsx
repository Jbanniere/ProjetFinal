import {useState, useContext, Fragment} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { NavLink, Navigate } from "react-router-dom"
import Modal from 'react-modal'



const Login = () => {
    
    const initialState = {password:'',email:''}
    const [info , setInfo] = useState(initialState)
    const [_, dispatch] = useContext(StoreContext)
    const [login, setLogin] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInfo({...info,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        
// faire gestion d'erreur si input vide

        axios.post(`${BASE_URL}/login`,{ email: info.email, password: info.password})
       .then(res => {
            if(res.data.response.response) {
                dispatch({
                    type: 'LOGIN',
                    payload: res.data.response.user
                })
                localStorage.setItem('jwtToken', res.data.response.token)
                axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                setInfo(initialState)
                setLogin(true)
            }
        })
        .catch(err => {
            console.log(err)
            setIsModalOpen(true)
        })
        
    }
    
    // FENETRE MODALE POUR ERREUR IDENTIFIANTS
    const [isModalOpen, setIsModalOpen] = useState(false) // Pour suivre si la fenêtre modale doit être affichée ou non
    const openModal = () => setIsModalOpen(true) // gestionnaires d'événements pour ouvrir et fermer la fenêtre modale
    const closeModal = () => setIsModalOpen(false)

    return(
        <Fragment>
        <h1>Se Connecter / S'inscrire</h1>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Déjà inscrit ?</legend>
                    <div className="fields">
                        <label> Email : </label>
                        <input className="input-size" type='text' placeholder='Mon email' name='email' onChange={handleChange} value={info.email} />
                    </div>
                    <div className="fields">
                        <label> Mot de passe : </label>
                        <input className="input-size" type='password' placeholder='Mon mot de passe' name='password' onChange={handleChange} value={info.password} />
                    </div>
                    <div className="center">
                        <button className="btn-valid">Se Connecter</button>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Rejoignez-nous ! </legend>
                    <div className="center">
                        <button className="btn-valid"><NavLink to="/register">Créer un compte</NavLink></button>
                    </div>
                </fieldset>
            </form> 
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Identifiants incorrects">
                <p>Email ou Mot de passe incorrect</p>
                <button className="btn-valid" onClick={closeModal}>OK</button>
            </Modal>
            
        { login && <Navigate to="/getProfil" /> }
        </Fragment>
    )
}


export default Login