import { useEffect, useState, Fragment } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { NavLink } from "react-router-dom"
import { faPen } from '@fortawesome/free-solid-svg-icons/faPen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"



const AllUsers = () => {
    const [ allUsers, setAllUsers ] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllUsers`)
            .then(res => setAllUsers(res.data.result.result))
            .catch(err => console.log(err))
    },[])
    
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, {id})
        .then(res => setAllUsers(allUsers.filter((e)=> e.id !== id)))
        .catch(err => console.log(err))
    }

    return(
        <Fragment>
        <h1>Mes Utilisateurs</h1>
           <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Rue</th>
                        <th>CP</th>
                        <th>Ville</th>
                        <th>Email</th>
                        <th>Modifier</th>
                        <th>Supprimer</th>
                    </tr>
                </thead>
                <tbody>
                    {allUsers.map((user,i) => {
                        return(
                        <tr key={i}>
                            <td>{user.id}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.street}</td>
                            <td>{user.zip}</td>
                            <td>{user.city}</td>
                            <td>{user.email}</td>
                            <td><button className="btn-array"><NavLink to={`/updateUser/${user.id}`}><FontAwesomeIcon icon={faPen} /></NavLink></button></td>
                            <td><button className="btn-array fatrash" onClick={()=> deleteUser(user.id)}><FontAwesomeIcon icon={faTrash}/></button></td>
                        </tr>
                        )
                    })}
                 </tbody>
            </table>
        </Fragment>
    )
}

export default AllUsers