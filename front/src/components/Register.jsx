import {useState, useEffect} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import { Navigate } from "react-router-dom";


const Register = () => {
    const [register, setRegister] = useState(false)
    const [userData, setUserData] = useState({
        nom:'', 
        prenom:'', 
        street:'',
        zip:'',
        city:'',
        email:'', 
        password:''
        
    })
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUserData({...userData,[name]:value})
    }
    
    const submit = (e) => {
        e.preventDefault()
        if(userData.password.length<= 8) {
            return alert("Votre mot de passe doit contenir plus de 8 caractères")
        }
        axios.post(`${BASE_URL}/register`,{
           nom : userData.nom,
           prenom: userData.prenom,
           street: userData.street,
           zip: userData.zip,
           city: userData.city,
           email: userData.email,
           password:userData.password
       })
       .then(setRegister(true))
    }
    
    
    return(
        <div>
        <h2> S'inscrire</h2>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Mes coordonnées</legend>
                        <div>
                            <label>Nom : </label>
                            <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={userData.nom} />
                        </div>
                        <div>
                            <label>Prénom :</label>
                            <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={userData.prenom} />
                        </div>
                        <div>
                            <label>N° et Rue : </label>
                            <input type='text' placeholder='n° et rue' name='street' onChange={handleChange} value={userData.street} />
                        </div>
                        <div>
                            <label>Code Postal :</label>
                            <input type='number' placeholder='zip' name='zip' onChange={handleChange} value={userData.zip} />
                        </div>
                        <div>
                            <label>Ville :</label>
                            <input type='text' placeholder='ville' name='city' onChange={handleChange} value={userData.city} />
                        </div>
                </fieldset>
                <fieldset>
                    <legend>Mes identifiants</legend>
                        <div>
                            <label> Email :</label>
                            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
                        </div>
                        <div>
                            <label>Mot de passe (doit contenir plus de 8 caractères)</label>
                            <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
                        </div>
                    </fieldset>
                    <button onClick={submit}>Valider mon inscription</button>
                
            </form>
            { register && <Navigate to="/login" replace={true} /> }
        </div>
        )
}

export default Register