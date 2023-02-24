import {useState, useEffect} from "react"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"
import { checkIsEmpty } from "../tools/checkInputEmpty.js"
import { Navigate } from "react-router-dom"

const Register = () => {
    const [register, setRegister] = useState(false)
    const [errors, setErrors] = useState({})
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
        
        // Je vérifie si les inputs sont vides, si oui j'envoie les erreurs dans le state errors
        const empty = checkIsEmpty(userData)
        if (Object.keys(empty).length > 0) {
            setErrors(empty);
            return
        }
        
        // Je vérifie si le mdp est confome >= 8, si non je maj le state errors
        if (userData.password.length <= 8 ) {
            setErrors({ password: 'Votre mot de passe doit contenir plus de 8 caractères' });
            return 
        }
        
        // Je vérifie si le zip contient 5 number si non j'envoie l'erreur dans le state errors
        if (userData.zip.length !== 5) {
            setErrors ({ zip: "Votre code postal doit contenir 5 chiffres"})
            return
        }
        
        //Je vérifie si le mail est au bon format
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            setErrors ({email : "Veuillez entrer une adresse email valide."})
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
        .then(res => {
            if(!res.data.result.error){
                // Si l'email n'existe pas, je valide l'inscription
                setRegister(true)
            } else {
                // Si l'email est déjà en BDD j'envoie l'erreur dans le state pour l'afficher
                setErrors({ email: 'Cet email existe déjà. Veuillez en choisir un autre.' })
            }
        })
        .catch (err => console.log(err))
    }
    
    console.log(errors)
    
    return(
        <div>
        <h2> S'inscrire</h2>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Mes coordonnées</legend>
                        <div>
                            <label>Nom : </label>
                            <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={userData.nom} />
                            {errors.nom && <p>{errors.nom}</p>}
                        </div>
                        <div>
                            <label>Prénom :</label>
                            <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={userData.prenom} />
                            {errors.prenom && <p>{errors.prenom}</p>}
                        </div>
                        <div>
                            <label>N° et Rue : </label>
                            <input type='text' placeholder='n° et rue' name='street' onChange={handleChange} value={userData.street} />
                            {errors.street && <p>{errors.street}</p>}
                        </div>
                        <div>
                            <label>Code Postal :</label>
                            <input type='number' placeholder='zip' name='zip' onChange={handleChange} value={userData.zip} />
                            {errors.zip && <p>{errors.zip}</p>}
                        </div>
                        <div>
                            <label>Ville :</label>
                            <input type='text' placeholder='ville' name='city' onChange={handleChange} value={userData.city} />
                            {errors.city && <p>{errors.city}</p>}
                        </div>
                </fieldset>
                <fieldset>
                    <legend>Mes identifiants</legend>
                        <div>
                            <label> Email :</label>
                            <input type='text' placeholder='email' name='email' onChange={handleChange} value={userData.email} />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div>
                            <label>Mot de passe (doit contenir plus de 8 caractères)</label>
                            <input type='password' placeholder='password' name='password' onChange={handleChange} value={userData.password} />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                    </fieldset>
                    <button onClick={submit}>Valider mon inscription</button>
                
            </form>
            { register && <Navigate to="/login" replace={true} /> }
        </div>
        )
}

export default Register