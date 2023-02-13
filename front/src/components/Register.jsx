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
        if(userData.password<= 8) {
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
         <form>
            <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={userData.nom} />
            <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={userData.prenom} />
            <input type='text' placeholder='adresse' name='adresse' onChange={handleChange} value={userData.adresse} />
            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
            <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
            <p>Le mot de passe doit contenir au moins 8 caractères</p>
            <button onClick={submit}>S'inscrire</button>
        </form>    
        )
}

export default Register