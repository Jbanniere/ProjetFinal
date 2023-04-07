import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { useState, Fragment } from "react"
import { useNavigate } from "react-router-dom"

const AddProduct = () => {
    const [isValidated, setIsValidated] = useState(false)
    const [product, setProduct] = useState({
        name:'',
        description:'',
        price:0,
    })
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setProduct({...product,[name]:value})
    }
    
    const submitData = (e) => {
        e.preventDefault()
        const dataFile = new FormData()
        const files = {...e.target.picture.files}
        
    
    // ajout d'autres inputs au formulaire
    dataFile.append('name', product.name)
    dataFile.append('description', product.description)
    dataFile.append('price', product.price)
        
    // L'image
    dataFile.append('files', files[0], files[0].name)
    
    axios.post(`${BASE_URL}/addProduct`, dataFile)
        .then((res)=> {
            e.preventDefault()
            res.data.response && console.log('succesfully upload')
            setIsValidated(true)
            alert("Votre produit a bien été ajouté")
            navigate("/getAllProduct")
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    return(
        <Fragment>
        <h1 className="contact-title">Ajouter un produit</h1>
        <form onSubmit={submitData} encType="multipart/form-data">
            <fieldset>
                <legend>Mon Produit</legend>
                        <div className="fields">
                            <label>Nom du produit:</label>
                            <input className="input-size" type='text' placeholder='Nom du produit' name='name' onChange={handleChange} value={product.name} />
                        </div>
                        <div className="fields">
                            <label>Description:</label>
                            <textarea placeholder='description' name='description' onChange={handleChange} value={product.description} />
                        </div>
                        <div className="fields">
                            <label>Prix:</label>
                            <input className="input-size" type='number' placeholder='prix du mensuel seul' name='price' onChange={handleChange} value={product.price} />
                        </div>
                        <div className="fields">
                            <p>Ajouter une image</p>
                            <label name='picture'>
                                <input type='file' name='picture'/>
                            </label>
                        </div>
                        <div>
                            <button className="btn-valid" type="submit">Créer mon produit</button>
                        </div>
                    {isValidated && (
                    
                        <p className="error-txt">Votre produit a été ajouté avec succès</p>
                       
                    )} 
            </fieldset>
        </form>
        </Fragment>
    )
}

export default AddProduct