import {useState, Fragment} from "react"
import {BASE_URL} from "../tools/constante.js"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope, faLocationDot } from "@fortawesome/free-solid-svg-icons"
import { checkIsEmpty } from "../tools/checkInputEmpty.js"


const ContactUs = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [errors, setErrors] = useState({})
    const [newContact, setNewContact] = useState({
        nom:'',
        prenom:'',
        email:'',
        objet: '',
        message:''
    })
    
    console.log(newContact)
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewContact({...newContact,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        const empty = checkIsEmpty(newContact)
        if (Object.keys(empty).length > 0) {
            setErrors(empty);
            return
        }
         //Je vérifie si le mail est au bon format
        if (!/\S+@\S+\.\S+/.test(newContact.email)) {
            setErrors ({email : "Veuillez entrer une adresse email valide."})
        }
        axios.post(`${BASE_URL}/contactUs`, {
            nom:newContact.nom,
            prenom:newContact.prenom,
            email:newContact.email,
            objet:newContact.objet,
            message:newContact.message
        })
        .then(res => {
            console.log(res)
            setIsValidated(true)
        })
    }
    
    return(
        <Fragment>
        <h1>Nous contacter</h1>
            <div>
                <p><FontAwesomeIcon icon={ faPhone } />02 33 44 55 66 (du lundi au vendredi de 9h à 18h)</p>
                <p><FontAwesomeIcon icon={ faEnvelope } />Utiliser le formulaire de contact ci-dessous</p>
                <div>
                    <FontAwesomeIcon icon={ faLocationDot} />
                    <p>Presse Mia</p>
                    <p>60 Rue du Général Raoul</p>
                    <p>CS 010203</p>
                    <p>44401 Rezé Cedex</p>
                </div>
            </div>
            <h2>Formulaire de contact</h2>
            <form onSubmit={submit}>
                <fieldset>
                <legend>Mes coordonnées</legend>
                    <div>
                        <label>Nom: </label>
                        <input type='text' placeholder='Nom' name='nom' onChange={handleChange} value={newContact.nom} />
                        {errors.nom && <p>{errors.nom}</p>}
                    </div>
                    <div>
                        <label>Prénom: </label>
                        <input type='text' placeholder='Prénom' name='prenom' onChange={handleChange} value={newContact.prenom}/>
                        {errors.prenom && <p>{errors.prenom}</p>}
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type='email' placeholder='Email' name='email' onChange={handleChange} value={newContact.email} />
                        {errors.email && <p>{errors.email}</p>}
                    </div>
                </fieldset>
            
                <fieldset>
                <legend>Ma Demande</legend>
                 <div>
                        <label>Objet de ma demande: </label>
                        <input type='text' placeholder='Objet' name='objet' onChange={handleChange} value={newContact.objet} />
                        {errors.objet && <p>{errors.objet}</p>}
                    </div>
                    <div>
                        <label>Message: </label>
                        <textarea placeholder='Message' name='message' onChange={handleChange} value={newContact.message} />
                        {errors.message && <p>{errors.message}</p>}
                    </div>
                    <div>
                        <input type='submit' value = 'Envoyer votre demande' />
                    </div>
                </fieldset>
            </form>
            
            {isValidated && (
            <p>Votre demande a bien été envoyé, nous mettons tout en oeuvre pour votre répondre rapidement. A bientôt !</p>
            )}
        </Fragment>
         )
}

export default ContactUs