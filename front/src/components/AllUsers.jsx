import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {faPen} from '@fortawesome/free-solid-svg-icons/faPen'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"



const AllUsers = () => {
    const [allUsers, setAllUsers] = useState([])
    
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllUsers`)
            .then(res => setAllUsers(res.data.result.result))
            .catch(err => console.log(err))
    },[])
    
    console.log(allUsers)
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, {id})
    }

    return(
       <table>
            <thead>
                <tr>
                    <th colSpan="7">All Users</th>
                </tr>
                <tr>
                    <th>id</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Adresse</th>
                    <th>Email</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {allUsers.map((user,i) => {
                    return(
                    <tr key={i}>
                        <td>{user.id}</td>
                        <td>{user.nom}</td>
                        <td>{user.prenom}</td>
                        <td>{user.adresse}</td>
                        <td>{user.email}</td>
                        <td><button><NavLink to={`/updateUser/${user.id}`}><FontAwesomeIcon icon={faPen} /></NavLink></button></td>
                        <td><button onClick={()=> deleteUser(user.id)}><FontAwesomeIcon icon={faTrash} color={ 'red' }/></button></td>
                    </tr>
                    )
                })}
             </tbody>
        </table>
    )
}

export default AllUsers