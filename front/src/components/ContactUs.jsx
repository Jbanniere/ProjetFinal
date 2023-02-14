import {useState} from "react"
import {BASE_URL} from "../tools/constante.js"
import axios from "axios"

const ContactUs = () => {
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
        axios.post(`${BASE_URL}/contactUs`, {
            nom:newContact.nom,
            prenom:newContact.prenom,
            email:newContact.email,
            objet:newContact.objet,
            message:newContact.message
        })
        .then(res => console.log(res))
    }
    
    return(
            <form onSubmit={submit}>
                <fieldset>
                <legend>Mes coordonnées</legend>
                    <div>
                        <label>Nom: </label>
                        <input type='text' placeholder='Nom' name='nom' onChange={handleChange} value={newContact.nom} />
                    </div>
                    <div>
                        <label>Prénom: </label>
                        <input type='text' placeholder='Prénom' name='prenom' onChange={handleChange} value={newContact.prenom} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type='email' placeholder='Email' name='email' onChange={handleChange} value={newContact.email} />
                    </div>
                </fieldset>
            
                <fieldset>
                <legend>Ma Demande</legend>
                 <div>
                        <label>Objet de ma demande: </label>
                        <input type='text' placeholder='Objet' name='objet' onChange={handleChange} value={newContact.objet} />
                    </div>
                    <div>
                        <label>Message: </label>
                        <input type='textarea' placeholder='Message' name='message' onChange={handleChange} value={newContact.message} />
                    </div>
                    <div>
                        <input type='submit' value = 'Envoyer votre demande' />
                    </div>
                </fieldset>
            </form>
         )
}

export default ContactUs