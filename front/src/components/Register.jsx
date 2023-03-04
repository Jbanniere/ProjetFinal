import { useState } from "react"
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
            setErrors(empty)
            return
        }
        
        // Je vérifie si le mdp est confome >= 8, si non j'envoie l'erreur ds le state errors
        if (userData.password.length <= 8 ) {
            setErrors({ password: 'Votre mot de passe doit contenir plus de 8 caractères' });
            return 
        }
        
        // Je vérifie si le zip contient 5 number si non j'envoie l'erreur ds le state errors
        if (userData.zip.length !== 5) {
            setErrors ({ zip: "Votre code postal doit contenir 5 chiffres"})
            return
        }
        
        //Je vérifie si le mail est au bon format
        if (!/\S+@\S+\.\S+/.test(userData.email)) {
            setErrors ({email : "Veuillez entrer une adresse email valide."})
        }
        // Si tout est OK je valide l'inscription
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
    
    
    return(
        <div>
        <h1> S'inscrire</h1>
            <form onSubmit={submit}>
                <fieldset>
                    <legend>Mes Coordonnées</legend>
                        <div className="fields">
                            <label>Nom : </label>
                            <input className="input-size" type='text' placeholder='Votre Nom' name='nom' onChange={handleChange} value={userData.nom} />
                            {errors.nom && <p>{errors.nom}</p>}
                        </div>
                        <div className="fields">
                            <label>Prénom :</label>
                            <input className="input-size" type='text' placeholder='Votre Prénom' name='prenom' onChange={handleChange} value={userData.prenom} />
                            {errors.prenom && <p>{errors.prenom}</p>}
                        </div>
                        <div className="fields">
                            <label>N° et Rue : </label>
                            <input className="input-size" type='text' placeholder='Adresse : N° et rue' name='street' onChange={handleChange} value={userData.street} />
                            {errors.street && <p>{errors.street}</p>}
                        </div>
                        <div className="fields">
                            <label>Code Postal :</label>
                            <input className="input-size" type='number' placeholder='Adresse : Code Postal' name='zip' onChange={handleChange} value={userData.zip} />
                            {errors.zip && <p>{errors.zip}</p>}
                        </div>
                        <div className="fields">
                            <label>Ville :</label>
                            <input className="input-size" type='text' placeholder='Adresse : Ville' name='city' onChange={handleChange} value={userData.city} />
                            {errors.city && <p>{errors.city}</p>}
                        </div>
                </fieldset>
                <fieldset>
                    <legend>Mes Identifiants</legend>
                        <div className="fields">
                            <label> Email :</label>
                            <input className="input-size" type='text' placeholder='Votre Email' name='email' onChange={handleChange} value={userData.email} />
                            {errors.email && <p>{errors.email}</p>}
                        </div>
                        <div className="fields">
                            <label>Mot de passe :</label>
                            <input className="input-size" type='password' placeholder='Mot de passe : Plus de 8 caractères' name='password' onChange={handleChange} value={userData.password} />
                            {errors.password && <p>{errors.password}</p>}
                        </div>
                    </fieldset>
                    <button className="btn-valid" onClick={submit}>Valider mon inscription</button>
                
            </form>
            { register && <Navigate to="/login" replace={true} /> }
        </div>
        )
}

export default Register