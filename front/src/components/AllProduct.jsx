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
    
    console.log(allProduct)

    return(
        <div>
           {allProduct.map((product,i) => {
                return(
                <div key={i}>
                    <h2>{product.name}</h2>
                    <p>Description : {product.description}</p>
                    <p>Prix du Mensuel seul : {product.price_solo}</p>
                    <p>Prix du Pack avec Hors Séries : {product.price_hs}</p>
                    <button><NavLink to={`/updateProduct/${product.id}`}>Modifier ce produit</NavLink></button>
                    <button>Supprimer ce produit</button>
                </div>
                )
            })}
        </div>
        )
}

export default AllProduct