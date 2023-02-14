import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const AllContactMessage = () => {
    const [allContact, setAllContact] = useState([])

    // Récupère tous les messages de contact
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllContactMessage`)
            .then(res => setAllContact(res.data.result.result))
            .catch(err => console.log(err))
            
    },[])
    
   
    // Valide la demande de changement d'état de la demande
    const submit = (index) => {
        // on fait du destructuring pour recuperer l'id et l'etat 
        const {id, etat} = allContact[index]
         axios.post(`${BASE_URL}/updateContactEtat`,{etat,id})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    
    console.log(allContact)
    
    // Supprime un message
    const handleDeleteContact = (id) => {
        axios.post(`${BASE_URL}/deleteContactMessage`)
        .then(res => setAllContact(allContact.filter((e)=> e.id !== id)))
    }
    
    const updateEtat = (index, etat) => {
        // on fait un copie de tout les message de contact
        const contact = [...allContact]
        // on assigne le nouvelle etat au format number
        contact[index].etat = parseInt(etat)
        // on met a jour tout les contact dans le state
        setAllContact([...contact])
    }
    
    return(
        <div>
            <h1>Messages reçus via le formulaire de contact</h1>
            {allContact.map((demande,i)=> {
            return(
            <div key={i}>
                <h2>{demande.objet}</h2>
                <p>Coordonnées : {demande.nom} {demande.prenom}</p>
                <p>Email :{demande.email}</p>
                <p>Objet :{demande.objet}</p>
                <p>Message : {demande.message}</p>
                {/* on envoie l'index et la valeur du contact modifier */}
                <select name="etat" onChange={(e) => updateEtat(i,e.target.value)} value={demande.etat}>
            		<option value={0}>Demande Non Traitée</option>
            		<option value={1}>Demande Traitée</option>
    		    </select>
    		    {/* On envoie l'index du contact modifier */}
    		    <button onClick={() => submit(i)}>Valider</button>
                <FontAwesomeIcon icon={faTrash} color={ 'red' }  onClick={() => handleDeleteContact(demande)} />
            </div>
           )
           })}
        </div>
        )
}

export default AllContactMessage