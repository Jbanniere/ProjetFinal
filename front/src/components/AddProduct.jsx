import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, Fragment} from "react"

const AddProduct = () => {
    const [product, setProduct] = useState({
        name:'',
        description:'',
        price_solo:0,
        price_hs:0
    })
    
    console.log(product)
    
const handleChange = (e) => {
    const {name, value} = e.target
    setProduct({...product,[name]:value})
}

const submitData = (e) => {
    e.preventDefault()
    // axios.post(`${BASE_URL}/addProduct`, {
    //     name: product.name,
    //     description: product.description,
    //     price_solo: product.price_solo,
    //     price_hs: product.price_hs
    // })
    // .then(res => console.log(res))
    
    const dataFile = new FormData()
    const files = {...e.target.picture.files}
    
    console.log(files)
    
    // ajout d'autre input au formulaire
    dataFile.append('name', product.name)
    dataFile.append('description', product.description)
    dataFile.append('price_solo', product.price_solo)
    dataFile.append('price_hs', product.price_hs)
    ///////// ???
        
    // L'image
    dataFile.append('files', files[0], files[0].name)
    
    axios.post(`${BASE_URL}/addProduct`, dataFile)
        .then((res)=> {
            console.log(res)
            res.data.response && console.log('succesfully upload');
        })
        .catch((err) => {
            console.log(err)
        })
}
    
    return(
        <Fragment>
        <form onSubmit={submitData} encType="multipart/form-data">
            <input type='text' placeholder='name' name='name' onChange={handleChange} value={product.name} />
            <input type='text' placeholder='description' name='description' onChange={handleChange} value={product.description} />
            <input type='number' placeholder='prix du mensuel seul' name='price_solo' onChange={handleChange} value={product.price_solo} />
            <input type='number' placeholder='prix du mensuel + hors série' name='price_hs' onChange={handleChange} value={product.price_hs} />
            <p>Ajouter une image</p>
            <label name='picture'>
                <input type='file' name='picture'/>
            </label>
            <div>
                <input type="submit" value="Créer nouveau produit" />
            </div>
        </form>
        </Fragment>
    )
}

export default AddProduct