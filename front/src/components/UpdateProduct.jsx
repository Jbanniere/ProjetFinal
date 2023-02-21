import {useState, useEffect } from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const UpdateProduct = () => {
    const [updateProduct, setUpdateProduct] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setUpdateProduct(res.data.result.result[0]))
            .catch(err => console.log(err))
    }, [id])
    
    console.log(updateProduct)
    
     const handleChange = (e) => {
        const {name, value} = e.target
        setUpdateProduct({...updateProduct, [name]: value})
    }
    
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/updateProduct`,{...updateProduct})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    } 
    
   return(
       <div>
       {updateProduct !== null && (
            <form>
                <div>
                    <label>Titre du mensuel : </label>
                    <input type='text' placeholder='name' name='name' onChange={handleChange} value={updateProduct.name} />
                </div>
                <div>
                    <label>Description : </label>
                    <textarea placeholder='description' name='description' onChange={handleChange} value={updateProduct.description} />
                </div>
                <div>
                    <label>Prix de l'abonnement mensuel seul : </label>
                    <input type='number' placeholder='prix du mensuel seul' name='price_solo' onChange={handleChange} value={updateProduct.price_solo} />
                </div>
                <div>
                    <label>Prix de l'abonnement + hors-séries</label>
                    <input type='number' placeholder='prix du mensuel + hors série' name='price_hs' onChange={handleChange} value={updateProduct.price_hs} />
                </div>
                <button onClick= {submit}>Valider mes modifications</button>
            </form>
            )}
        </div>
       )
}
export default UpdateProduct