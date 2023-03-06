import { useEffect, useState, Fragment } from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { formatDate } from "../tools/date.js"

const AllContactMessage = () => {
    const [allContact, setAllContact] = useState([])

    // Récupère tous les messages de contact
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllContactMessage`)
            .then(res => setAllContact(res.data.result.result))
            .catch(err => console.log(err))
            
    },[])
    
   
    // Valide le changement d'état de la demande
    const submit = (index) => {
        // on fait du destructuring pour recuperer l'id et l'etat 
        const {id, etat} = allContact[index]
         axios.post(`${BASE_URL}/updateContactEtat`,{etat,id})
            .catch(err => console.log(err))
    }

    // Supprime un message
    const deleteContact = (id) => {
        axios.post(`${BASE_URL}/deleteContactMessage`)
        .then(res => setAllContact(allContact.filter((e)=> e.id !== id)))
        .catch(err => console.log(err))
    }
    
    // Modifier l'état de la demande : traité/non traité
    const updateEtat = (index, etat) => {
        // on fait une copie de tous les messages de contact
        const contact = [...allContact]
        // on assigne le nouvel état au format number
        contact[index].etat = parseInt(etat)
        // on met a jour tous les contacts dans le state
        setAllContact([...contact])
    }
    
    return(
        <Fragment>
            <h1>Mes Messages</h1>
            <table className="full-table">
                <thead>
                     <tr>
                        <th colSpan="8">Mes Demandes de contact</th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Objet</th>
                        <th>Message</th>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Email</th>
                        <th>Etat</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
               <tbody>
                     {allContact.map((demande,i)=> {
                        return(
                        <tr key={i} className={`etat-${demande.etat}`}>
                            <td>{formatDate(demande.date)}</td>
                            <td>{demande.objet}</td>
                            <td>{demande.message}</td>
                            <td>{demande.nom}</td>
                            <td>{demande.prenom}</td>
                            <td>{demande.email}</td>
                            <td>
                                <select name="etat" onChange={(e) => updateEtat(i,e.target.value)} value={demande.etat}>
                		          <option value={0}>Demande Non Traitée</option>
                		          <option value={1}>Demande Traitée</option>
        		                </select>
        		              <button onClick={() => submit(i)}>Valider</button>
        		            </td>
                            <td>
                                <FontAwesomeIcon className="icon-fatrash" icon={faTrash} onClick={() => deleteContact(demande.id)} />
                            </td>
                        </tr>
                      )
                   })} 
                   </tbody>
            </table>
            <table className="mobile-table">
                <thead>
                     <tr>
                        <th colSpan="8">Mes Demandes de contact</th>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <th>Contact</th>
                        <th>Etat</th>
                        <th>Supp</th>
                    </tr>
                </thead>
               <tbody>
                     {allContact.map((demande,i)=> {
                        return(
                        <tr key={i} className={`etat-${demande.etat}`}>
                            <td>
                                <p>{formatDate(demande.date)}</p>
                                <p>{demande.message}</p>
                            </td>
                            <td>
                                <p>{demande.nom}</p>
                                <p>{demande.prenom}</p>
                                <p>{demande.email}</p>
                            </td>
                            <td>
                                <select name="etat" onChange={(e) => updateEtat(i,e.target.value)} value={demande.etat}>
                		          <option value={0}>Non Traitée</option>
                		          <option value={1}>Traitée</option>
        		                </select>
        		              <button onClick={() => submit(i)}>OK</button>
        		            </td>
                            <td>
                                <FontAwesomeIcon className="icon-fatrash" icon={faTrash} onClick={() => deleteContact(demande.id)} />
                            </td>
                        </tr>
                      )
                   })} 
                   </tbody>
            </table>
        </Fragment>
        )
}

export default AllContactMessage

        // <div key={i}>
        //         <h2>{formatDate(demande.date)} Objet : {demande.objet}</h2>
        //         <p>Message : {demande.message}</p>
        //         <p>Coordonnées : {demande.nom} {demande.prenom}</p>
        //         <p>Email :{demande.email}</p>
        //         {/* on envoie l'index et la valeur du contact modifié */}
        //         <select name="etat" onChange={(e) => updateEtat(i,e.target.value)} value={demande.etat}>
        //     		<option value={0}>Demande Non Traitée</option>
        //     		<option value={1}>Demande Traitée</option>
    		  //  </select>
    		  //  {/* On envoie l'index du contact modifié */}
    		  //  <button onClick={() => submit(i)}>Valider</button>
        //         <FontAwesomeIcon icon={faTrash} color={ 'red' }  onClick={() => deleteContact(demande.id)} />
        //     </div>