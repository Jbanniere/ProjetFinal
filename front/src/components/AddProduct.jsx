import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState} from "react"

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

const submit = (e) => {
    axios.post(`${BASE_URL}/addProduct`, {
        name: product.name,
        description: product.description,
        price_solo: product.price_solo,
        price_hs: product.price_hs
    })
}
    
    return(
        <div>
            <input type='text' placeholder='name' name='name' onChange={handleChange} value={product.name} />
            <input type='text' placeholder='description' name='description' onChange={handleChange} value={product.description} />
            <input type='number' placeholder='prix du mensuel seul' name='price_solo' onChange={handleChange} value={product.price_solo} />
            <input type='number' placeholder='prix avec hors série' name='price_hs' onChange={handleChange} value={product.price_hs} />
            <button onClick= {submit}> Create product </button>
        </div>
    )
}

export default AddProduct