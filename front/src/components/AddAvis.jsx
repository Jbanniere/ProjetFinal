import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useContext, useEffect} from "react"
import {StoreContext} from "../tools/context.js"
import {useParams} from "react-router-dom"

const AddAvis = () => {
    const {product_id} = useParams()
    const [state, dispatch] = useContext(StoreContext)
    const [newAvis, setNewAvis] = useState({
        user_id:state.user.id,
        product_id:product_id,
        content:"",
        note:0
    })
    /*const [product,setProduct] = useState([])*/
    
    /*console.log(product_id)
    useEffect(() => {
        axios.get(`${BASE_URL}/getProductById`, {id})
            .then(res =>setProduct(res.data.result.result))
            .catch(err => console.log(err))
    },[product_id])*/
   console.log(newAvis)
    
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
       .then(res => console.log(res))
    }
    
    return(
        <div>
            <h2>Ce que j'ai pensé de</h2>
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
    		        </div>
    		        <div>
    		            <label>En quelques mots : </label>
                        <textarea type="text" placeholder='Message' name='content' onChange={handleChange} value={newAvis.content} />
    		        </div>
    		        <button type='submit'>Envoyer</button>
                </fieldset>
            </form>
        </div>)
}

export default AddAvis
