import {useState, useEffect, useContext} from "react"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"


const UpdateUser = () => {
    const [updateUser, setUpdateUser] = useState(null)
    const [state, dispatch] = useContext(StoreContext)
    const {id} = useParams()
    const navigate = useNavigate()
    const [isValidated, setIsValidated] = useState(false)

    
    // Vérifie que c'est le bon user qui veut update le profil, sinon on redirige
        useEffect(()=> {
            if(id != state.user.id) return navigate("/");
        },[])
        
        useEffect(() => {
            if(id == state.user.id){
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
                console.log(res)
            })
            .catch(err => console.log(err))
    }

   return(
        <div>
        
        {updateUser && (
           <form>
           <fieldset>
                <label>Nom : </label>
                <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={updateUser.nom} />
                <label>Prénom : </label>
                <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={updateUser.prenom} />
                <label>Numéro et Rue : </label>
                <input type='text' placeholder='street' name='street' onChange={handleChange} value={updateUser.street} />
                <label>Code Postal : </label>
                <input type='number' placeholder='zip' name='zip' onChange={handleChange} value={updateUser.zip} />
                <label>Ville : </label>
                <input type='text' placeholder='city' name='city' onChange={handleChange} value={updateUser.city} />
                <label>Email : </label>
                <input type='text' placeholder='email' name='email' onChange={handleChange} value={updateUser.email} />
                <button onClick={submit}>Modifier les infos</button>
            </fieldset>
        </form>   
            )}
            
        {isValidated && (
            <p>Votre modification a bien été prise en compte</p>
        )}
        </div>
       )
}

export default UpdateUser