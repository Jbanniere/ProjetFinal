import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"

const AllProduct = () => {
    const [allProduct, setAllProduct] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProduct`)
            .then(res => setAllProduct(res.data.allProduct.result))
            .catch(err => console.log(err))
    },[])
    
    
    const deleteProduct = (id) => {
        axios.post(`${BASE_URL}/deleteProduct`, {id})
        .then(res => setAllProduct(allProduct.filter((e)=> e.id !== id)))
    }

    return(
        <div>
           {allProduct.map((product,i) => {
           console.log(product)
                return(
                <div key={i}>
                    <h2>{product.name}</h2>
                    <p>Description : {product.description}</p>
                    <p>Prix du Mensuel seul : {product.price_solo}</p>
                    <p>Prix du Pack avec Hors Séries : {product.price_hs}</p>
                    <p>Images : {product.caption}</p>
                    <img src={`${BASE_URL}/img/${product.url}`} alt={product.caption} />
                    <button><NavLink to={`/updateProduct/${product.id}`}>Modifier les infos</NavLink></button>
                    <button><NavLink to={`/updatePicture/${product.pictures_id}`}>Modifier les images</NavLink></button>
                    <button onClick={()=> deleteProduct(product.id)}>Supprimer ce produit</button>
                </div>
                )
            })}
        </div>
        )
}

export default AllProduct