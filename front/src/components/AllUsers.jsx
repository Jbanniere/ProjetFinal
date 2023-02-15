import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"

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
        <div>
           {allUsers.map((user,i) => {
                return(
                <div key={i}>
                    <h2>id :{user.id}</h2>
                    <p>Prénom : {user.prenom}</p>
                    <p>Nom :{user.nom}</p>
                    <p>Adresse : {user.adresse}</p>
                    <p>Email : {user.email}</p>
                    <button><NavLink to={`/updateUser/${user.id}`}>Modifier les infos</NavLink></button>
                    <button onClick={()=> deleteUser(user.id)}>Supprimer cet utilisateur</button>
                </div>
                )
            })}
        </div>
        )
}

export default AllUsers

                /* <table>
                        <thead>
                            <tr>
                                <th colSpan="5">The table header</th>
                            </tr>
                            <tr>
                                <th>id</th>
                                <th>Nom</th>
                                <th>Prénom</th>
                                <th>Adresse</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.nom}</td>
                                <td>{user.prenom}</td>
                                <td>{user.adresse}</td>
                                <td>{user.email}</td>
                            </tr>
                        </tbody>
                    </table>*/