import {useState, useContext, Fragment} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { NavLink, Navigate } from "react-router-dom"


const Login = () => {
    
    const initialState = {password:'',email:''}
    const [info , setInfo] = useState(initialState)
    const [state, dispatch] = useContext(StoreContext)
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
            } else {
                alert("Email ou mot de passe invalide")
            }
        })
    }

    return(
        <Fragment>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Déjà inscrit ?</legend>
                    <label> Email : </label>
                    <input type='text' placeholder='email' name='email' onChange={handleChange} value={info.email} />
                    <label> Mot de passe : </label>
                    <input type='password' placeholder='password' name='password' onChange={handleChange} value={info.password} />
                    <button type='submit'>Se Connecter</button>
                </fieldset>
                <fieldset>
                    <legend>Rejoindre la tribu ?</legend>
                    <button><NavLink to="/register">Créer un compte</NavLink></button>
                </fieldset>
            </form> 
         { login && <Navigate to="/getProfil" /> }
        </Fragment>
    )
}


export default Login