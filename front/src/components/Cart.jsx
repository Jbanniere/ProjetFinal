import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, useEffect} from "react"
import axios from "axios"
import {StoreContext} from "../tools/context.js"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [newCart, setNewCart] = useState([])
    const [pictures, setPictures] = useState([])
    const user_id = state.user.id
    
    console.log(state)
    
    // Je récupère tous les produits que je stocke dans le reducer
    useEffect(()=>{
        if(state.products.length === 0){
           axios.get(`${BASE_URL}/getAllProduct`)
           .then(res => {
               dispatch({
                   type:"ALL_PRODUCTS",
                   payload:res.data.allProduct.result})
           })
           .catch(err => console.log(err))
        }
    },[])
    
    
    // Je récupère toutes les infos des produits en BDD (tables pictures, products) qui sont dans le cart du user pour les mettre dans le reducer
    useEffect(() => {
        axios.post(`${BASE_URL}/getPictByProductInCartByUserId`,{user_id})
            .then(res => {
                console.log(res)
                dispatch({type:"INIT_CART",payload:res.data.result.result})
                //setPictures(res.data.result.result)
                })
            .catch(err => console.log(err))
    }, [user_id])
    
    
    // Pour supprimer un produit dans la table cart
    const handleDelete = (id, productId) => {
        console.log({id,productId})
        
        axios.post(`${BASE_URL}/deleteCartProduct`, {id})
        .then(() => {
            let result = state.cart.filter((e) => {
                console.log({e, productId})
                return e.product_id !== productId
            })
            console.log(result)
            dispatch ({
                type : "REMOVE_ITEM_FROM_CART",
                payload : result
            })
        })
    }
    
    return(
        <Fragment>
        <h1>Mon Panier</h1>
        {state.cart.length > 0 && state.cart.map((cart,i) => {
            return(
            <div key={i}>
                <img src={`${BASE_URL}/img/${cart.url}`} width = "20%" alt={cart.caption} />
                <p>{cart.name} : {cart.description}</p>
                <p>Quantité : {cart.quantity}</p>
                <p>{cart.price}€ / Mois</p>
                <button onClick={() => handleDelete(cart.id, cart.product_id)}>Supprimer</button>
                <p>Sous Total = {Number(cart.quantity)*Number(cart.price)}€ / Mois</p>
            </div>
            )
        })}
        <div>TOTAL =</div>
            <button>Valider mon panier</button>  
        </Fragment>
    )  
}

export default Cart

/*<table>
                <thead>
                    <tr>
                        <th colSpan= "6">Mon Panier</th>
                    </tr>
                    <tr>
                        <th>Product Id</th>
                        <th>Aperçu</th>
                        <th>Nom du produit</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Total</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                {state.cart.map((item,i) => {
                    return(
                    <tr key={i}>
                        <td>{item.product}</td>
                        <td>Image</td>
                        <td>{item.name}</td>
                        <td>{item.quantite}</td>
                        <td>{item.prix}</td>
                        <td>Sous Total</td>
                        <td>
                            <FontAwesomeIcon icon={faTrash} color={ 'red' } onClick={() => handleRemoveItem(item.product)}/>
                        </td>
                    </tr>
                    )
                })}
                
                {pictures.map((cart,i) => {
                    return(
                    <tr key={i}>
                        <td>{cart.product_id}</td>
                        <td><img src={`${BASE_URL}/img/${cart.url}`} width = "25%" alt={cart.caption} /></td>
                        <td>{cart.name}</td>
                        <td>{cart.quantity}</td>
                        <td>{cart.price}</td>
                        <td>Sous Total</td>
                        <td>
                            <FontAwesomeIcon icon={faTrash} color={ 'red' } onClick={() => handleSubmit(cart.id)}/>
                        </td>
                    </tr>
                    )
                })}
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>Sous-Total</td>
                    </tr>
                </tbody>
            </table>*/