import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { useState, useContext } from "react"
import { StoreContext } from "../tools/context.js"
import { useParams } from "react-router-dom"

const AddAvis = () => {
    const {product_id} = useParams()
    const [state, dispatch] = useContext(StoreContext)
    const [isValidated, setIsValidated] = useState(false)
    const [newAvis, setNewAvis] = useState({
        user_id:state.user.id,
        product_id:product_id,
        content:"",
        note:0
    })
    
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewAvis({...newAvis,[name]:value})
    }
    
     const submit = (e) => {
        e.preventDefault()
        
        axios.post(`${BASE_URL}/addAvis`,{
            user_id:state.user.id,
            product_id:product_id,
            content:newAvis.content,
            note:newAvis.note
       })
       .then(res => {
           setIsValidated(true)
       })
       .catch(err => console.log(err))
       
    }
  
    return(
        <div className="container">
        {state.products.map((product,i) => {
            if(product.id == product_id) {
            return(
                <h1 className="contact-title" key={i}>Ce que j'ai pensé de {product.name}</h1>
                )
            }
        })}
            <form onSubmit={submit}>
                <div>
                    <label>Donnez une note de 0 à 5 :</label>
                    <select name="note" onChange={handleChange} value={newAvis.note}>
                		<option value={0}>0</option>
                		<option value={1}>1</option>
                		<option value={2}>2</option>
                		<option value={3}>3</option>
                		<option value={4}>4</option>
                		<option value={5}>5</option>
    		        </select>
		        </div>
		        <div>
		            <label>En quelques mots : </label>
                    <textarea type="text" placeholder='Message' name='content' onChange={handleChange} value={newAvis.content} />
		        </div>
		        <div>
		            <button type='submit'>Envoyer</button>
		        </div>
            </form>
            {isValidated && (
                    <p className="error-txt">Merci pour votre avis !</p>
                )} 
        </div>)
}

export default AddAvis
