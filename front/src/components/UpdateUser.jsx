import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const UpdateUser = () => {
    const [updateUser, setUpdateUser] = useState(null)
    const {id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getUserById`,{id})
            .then(res => setUpdateUser(res.data.result.result[0]))
            .catch(err => console.log(err))
    }, [id])
    
    console.log(updateUser)
    
     const handleChange = (e) => {
        const {name, value} = e.target
        setUpdateUser({...updateUser, [name]: value})
    }
    
    const submit = (e) =>{
        e.preventDefault()
        console.log(updateUser)
        axios.post(`${BASE_URL}/updateUser`,{...updateUser})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    } 
    
   return(
       <div>
       {updateUser !== null && (
           <form>
                <label>Nom : </label>
                <input type='text' placeholder='nom' name='nom' onChange={handleChange} value={updateUser.nom} />
                <label>Prénom : </label>
                <input type='text' placeholder='prénom' name='prenom' onChange={handleChange} value={updateUser.prenom} />
                <label>Adresse : </label>
                <input type='text' placeholder='adresse' name='adresse' onChange={handleChange} value={updateUser.adresse} />
                <label>Email : </label>
                <input type='text' placeholder='email' name='email' onChange={handleChange} value={updateUser.email} />
                <button onClick={submit}>Modifier les infos</button>
        </form>   
            )}
        </div>
       )
}
export default UpdateUser