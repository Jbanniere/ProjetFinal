import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"
import { StoreContext } from "../tools/context.js"


const UpdateUser = () => {
    const [updateUser, setUpdateUser] = useState(null)
    const [state, dispatch] = useContext(StoreContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [isValidated, setIsValidated] = useState(false)

    
    // Vérifie que c'est le bon user qui veut update le profil, sinon on redirige
        useEffect(()=> {
            if(!state.user.isAdmin && state.user.id != id) return navigate("/");
        },[])
       
       
        useEffect(() => {
            if(state.user.isAdmin || id == state.user.id){
                axios.post(`${BASE_URL}/getUserById`,{id})
                    .then(res => setUpdateUser(res.data.result.result[0]))
                    .catch(err => console.log(err))
           }
        }, [id])
    
    
     const handleChange = (e) => {
        const {name, value} = e.target
        setUpdateUser({...updateUser, [name]: value})
    }
    
    // Pour valider la modification du user
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/updateUser`,{...updateUser})
            .then(res => { 
                setIsValidated(true)
            })
            .catch(err => console.log(err))
    }

   return(
        <div>
            <h1>Modifier les Infos</h1>
            
            {updateUser && (
            <form type="submit">
                <fieldset>
                <legend>Infos à modifier</legend>
                    <div className="fields">
                        <label>Nom : </label>
                        <input className="input-size" type='text' placeholder='nom' name='nom' onChange={handleChange} value={updateUser.nom} />
                    </div>
                    <div className="fields">
                        <label>Prénom : </label>
                        <input className="input-size" type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={updateUser.prenom} />
                    </div>
                    <div className="fields">
                        <label>Numéro et Rue : </label>
                        <input className="input-size" type='text' placeholder='street' name='street' onChange={handleChange} value={updateUser.street} />
                    </div>
                    <div className="fields">
                        <label>Code Postal : </label>
                        <input className="input-size" type='number' placeholder='zip' name='zip' onChange={handleChange} value={updateUser.zip} />
                    </div>
                    <div className="fields">
                        <label>Ville : </label>
                        <input className="input-size" type='text' placeholder='city' name='city' onChange={handleChange} value={updateUser.city} />
                    </div>
                    <div className="fields">
                        <label>Email : </label>
                        <input className="input-size" type='email' placeholder='email' name='email' onChange={handleChange} value={updateUser.email} />
                    </div>
                    <div className="btn-input">
                        <button onClick={submit}>Modifier les infos</button>
                    </div>
                </fieldset>
            </form>   
            )}
            
        {isValidated && (
            <p className="error-txt">Votre modification a bien été prise en compte</p>
        )}
        </div>
       )
}

export default UpdateUser