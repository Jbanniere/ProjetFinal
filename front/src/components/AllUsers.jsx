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
                    <p>Prénom : {user.prenom}Nom :{user.nom}</p>
                    <p>Adresse : {user.adresse}</p>
                    <p>Email : {user.mail}</p>
                    <button><NavLink to={`/updateUser/${user.id}`}>Modifier les infos</NavLink></button>
                    <button onClick={()=> deleteUser(user.id)}>Supprimer cet utilisateur</button>
                </div>
                )
            })}
        </div>
        )
}

export default AllUsers