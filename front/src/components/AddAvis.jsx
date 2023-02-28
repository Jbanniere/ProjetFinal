import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useContext, useEffect} from "react"
import {StoreContext} from "../tools/context.js"
import {useParams} from "react-router-dom"
import { checkIsEmpty } from "../tools/checkInputEmpty.js"

const AddAvis = () => {
    const {product_id} = useParams()
    const [errors, setErrors] = useState({})
    const [state, dispatch] = useContext(StoreContext)
    const [isValidated, setIsValidated] = useState(false)
    const [newAvis, setNewAvis] = useState({
        user_id:state.user.id,
        product_id:product_id,
        content:"",
        note:0
    })
    
   console.log(newAvis)
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewAvis({...newAvis,[name]:value})
    }
    console.log(errors)
    
     const submit = (e) => {
        e.preventDefault()
        
        // Je vérifie si les inputs sont vides, si oui j'envoie les erreurs dans le state errors
        //
        // FONCTION ERREUR
        //
        //
        
        //Si tout est ok je valide l'ajout de l'avis
        axios.post(`${BASE_URL}/addAvis`,{
            user_id:state.user.id,
            product_id:product_id,
            content:newAvis.content,
            note:newAvis.note
       })
       .then(res => {
           setIsValidated(true)
           console.log(res)
           
       })
       
    }
    console.log(newAvis)
    
    return(
        <div>
        {state.products.map((product,i) => {
            if(product.id == product_id) {
            return(
                <h2 key={i}>Ce que j'ai pensé de {product.name}</h2>
                )
            }
        })}
            
            <form onSubmit={submit}>
                <fieldset>
                <legend>Mon Avis</legend>
                    <div>
                        Donnez une note de 0 à 5 : 
                        <select name="note" onChange={handleChange} value={newAvis.note}>
                    		<option value={0}>0</option>
                    		<option value={1}>1</option>
                    		<option value={2}>2</option>
                    		<option value={3}>3</option>
                    		<option value={4}>4</option>
                    		<option value={5}>5</option>
        		        </select>
        		        {errors.note && <p>{errors.note}</p>}
    		        </div>
    		        <div>
    		            <label>En quelques mots : </label>
                        <textarea type="text" placeholder='Message' name='content' onChange={handleChange} value={newAvis.content} />
    		            {errors.message && <p>{errors.message}</p>}
    		        </div>
    		        <button type='submit'>Envoyer</button>
                </fieldset>
            </form>
            {isValidated && (
                    <p>Merci pour votre avis !</p>
                )} 
        </div>)
}

export default AddAvis
