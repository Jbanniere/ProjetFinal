import {useState} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const Register = () => {
    const [userData, setUserData] = useState({
        nom:'', 
        prenom:'', 
        adresse:'', 
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
           adresse: userData.adresse,
           email: userData.email,
           password:userData.password
       })
       .then(res => console.log(res))
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
                            <label>Adresse : </label>
                            <input type='text' placeholder='adresse' name='adresse' onChange={handleChange} value={userData.adresse} />
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
        </div>
        )
}

export default Register