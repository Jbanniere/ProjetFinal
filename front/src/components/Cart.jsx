import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, useEffect} from "react"
import axios from "axios"
import {StoreContext} from "../tools/context.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [product, setProduct] = useState([])
    const id = state.cart.product
    
    //Je récupère les infos des produits via leur id
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setProduct(res.data.result.result))
            .catch(err => console.log(err))
    }, [id])
    
    console.log(product)

    return(
        <Fragment>
            <h1>Mon Panier</h1>
            <table>
                <thead>
                    <tr>
                        <th colSpan= "6">Mon Panier</th>
                    </tr>
                    <tr>
                        <th>Product Id</th>
                        <th>Nom du produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{state.cart.product}</td>
                        <td>product.name</td>
                        <td>{state.cart.quantite}</td>
                        <td>{state.cart.prix}</td>
                        <td>Sous Total</td>
                        <td>
                            <FontAwesomeIcon icon={faTrash} color={ 'red' }/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>Sous-Total</td>
                    </tr>
                </tbody>
            </table>
            <button>Valider mon panier</button>  
        </Fragment>
    )  
}

export default Cart