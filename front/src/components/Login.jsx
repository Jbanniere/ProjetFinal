import {useState, useContext} from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { NavLink } from "react-router-dom"


const Login = () => {
    
    const initialState = {password:'',email:''}
    const [info , setInfo] = useState(initialState)
    const [state, dispatch] = useContext(StoreContext)
        
    const handleChange = (e) => {
        const {name, value} = e.target
        setInfo({...info,[name]:value})
    }
    
    console.log(state)
    const submit = (e) => {
        e.preventDefault()
        
// faire gestion d'erreur si input vide

        axios.post(`${BASE_URL}/login`,{ email: info.email, password: info.password})
       .then(res => {
           console.log(res)
           console.log(res.data.response)
                if(res.data.response.response) {
                    dispatch({
                        type: 'LOGIN',
                        payload: res.data.response.user
                    })
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    setInfo(initialState)
                }
            })
        }

    return(
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
    )
}


export default Login