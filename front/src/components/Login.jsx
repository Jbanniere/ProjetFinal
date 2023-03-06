import {useState, useContext, Fragment} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { NavLink, Navigate } from "react-router-dom"


const Login = () => {
    
    const initialState = {password:'',email:''}
    const [info , setInfo] = useState(initialState)
    const [_, dispatch] = useContext(StoreContext)
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
            }
        })
        .catch(err => {
            console.log(err)
            alert("Email ou mot de passe invalide")
        })
        
    }

    return(
        <Fragment>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Déjà inscrit ?</legend>
                    <div className="fields">
                        <label> Email : </label>
                        <input className="input-size" type='text' placeholder='email' name='email' onChange={handleChange} value={info.email} />
                    </div>
                    <div className="fields">
                        <label> Mot de passe : </label>
                        <input className="input-size" type='password' placeholder='password' name='password' onChange={handleChange} value={info.password} />
                    </div>
                    <button className="btn-valid">Se Connecter</button>
                </fieldset>
                <fieldset>
                    <legend>Rejoindre la tribu ?</legend>
                    <button className="btn-valid"><NavLink to="/register">Créer un compte</NavLink></button>
                </fieldset>
            </form> 
         { login && <Navigate to="/getProfil" /> }
        </Fragment>
    )
}


export default Login