import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { BASE_URL } from "../tools/constante.js"

const UpdateProduct = () => {
    const [updateProduct, setUpdateProduct] = useState(null)
    const [isValidated, setIsValidated] = useState(false)
    const {id} = useParams()

    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setUpdateProduct(res.data.result.result[0]))
            .catch(err => console.log(err))
    }, [id])
    
     const handleChange = (e) => {
        const {name, value} = e.target
        setUpdateProduct({...updateProduct, [name]: value})
    }
    
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/updateProduct`,{...updateProduct})
            .then(res => {
                setIsValidated(true)
            })
            .catch(err => console.log(err))
    } 
    
   return(
       <div>
            <h1>Modifier un produit</h1>
       {updateProduct !== null && (
            <form type="submit">
                <div className="fields">
                    <label>Titre du mensuel : </label>
                    <input className="input-size" type='text' placeholder='name' name='name' onChange={handleChange} value={updateProduct.name} />
                </div>
    
                <div className="fields">
                    <label>Prix de l'abonnement: </label>
                    <input className="input-size" type='number' placeholder='prix du mensuel seul' name='price' onChange={handleChange} value={updateProduct.price} />
                </div>
                <div className="fields">
                    <label>Description : </label>
                    <textarea placeholder='description' name='description' onChange={handleChange} value={updateProduct.description} />
                </div>
                <div className="btn-input">
                    <button className="btn-valid" onClick= {submit}>Valider mes modifications</button>
                </div>
            </form>
            )}
        {isValidated && (
            <p>Votre modification a été prise en compte</p>
        )}
        </div>
       )
}
export default UpdateProduct