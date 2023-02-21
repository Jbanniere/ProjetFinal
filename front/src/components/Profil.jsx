import {useEffect, useState, useContext, useNavigate, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import Login from "./Login.jsx"



const Profil = () => {
    const [userProfil, setUserProfil] = useState([])
    const [state, dispatch] = useContext(StoreContext)
    const id = state.user.id

     useEffect(() => {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res => setUserProfil(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [id]) 
    
    console.log(id)
    
    const deleteUser = (id) => {
        axios.post(`${BASE_URL}/deleteUser`, {id})
    }
    
    return(
        <Fragment>
        {state.user.isLogged === true && (
            <div>
                {userProfil.map((profil,i) => {
                    return(
                    <div key={i}>
                        <h2>Hello {profil.prenom}</h2>
                        <h3>Mes Coordonnées</h3>
                        <p>Nom : {profil.nom}</p>
                        <p>Prénom : {profil.prenom}</p>
                        <p>Adresse : {profil.rue}{profil.zip}{profil.city}</p>
                        <p>Email : {profil.email}</p>
                        <button><NavLink to={`/updateUser/${profil.id}`}>Modifier mes infos</NavLink></button>
                        <button onClick={()=> deleteUser(profil.id)}>Supprimer mon compte</button>
                    </div>
                    )   
                })}
            </div>
            )}
            
            {state.user.isLogged === false && (
            <div>
                <p>Oups ! Page réservée aux membres</p>
                <p>Se connecter ou s'inscrire : </p>
                <Login />
            </div>
            )}
            
        </Fragment>
        )
}

export default Profil
/*
const res = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
            if (res) {
            axios.post(`${BASE_URL}/deleteUser`, {id})
            isDeleted = true
            } else {
            navigate('/getProfil')
            }*/