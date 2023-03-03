import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, useEffect} from "react"
import { StoreContext } from "../tools/context.js"
import axios from "axios"

const Cart = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [qte, setQte] = useState(0)
    const user_id = state.user.id
    const [isValidated, setIsValidated] = useState(false)
    const [abonnement, setAbonnement] = useState({
        user_id: user_id,
    })
    
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
    
    const editCartData = (data) => {
        const forCart = []
        data.forEach(e => {
            const id = e.product_id
            delete e.product_id
            e.id = id
            forCart.push(e)
        })
        return forCart
    }
    
    
    // Je récupère toutes les infos des produits en BDD (tables pictures, products) qui sont dans le cart du user pour les mettre dans le reducer
    useEffect(() => {
        if(state.cart.length === 0){
        axios.post(`${BASE_URL}/getPictByProductInCartByUserId`,{user_id})
            .then(res => {
                dispatch({
                    type:"INIT_CART",
                    payload:editCartData(res.data.result.result)
                    
                })
            })
            .catch(err => console.log(err))
        }
    }, [user_id])
    
    
    // Pour supprimer un produit dans la table cart
    const handleDelete = (product_id) => {
        axios.post(`${BASE_URL}/deleteCartProduct`, {product_id})
        .then(() => {
            let result = state.cart.filter((e) => {
                return e.product_id !== product_id
            })
            dispatch ({
                type : "REMOVE_ITEM_FROM_CART",
                payload : result
            })
        })
        .catch(err => console.log(err))
    }
    
    // Pour valider l'abonnement et envoyer les infos en BDD
    const handleSubmit = () => {
        axios.post(`${BASE_URL}/addAbonnement`, {
            user_id: user_id,
        })
        .then(res => {
           setIsValidated(true)
           dispatch({type:"INIT_CART", payload:[]})
           console.log(res)
       })
       .catch(err => console.log(err))
    }
   
    
    console.log(state)
    
    return(
        <Fragment>
        <h1>Mon Panier</h1>
        {state.cart.length === 0 && <p>Votre panier est vide</p>}
        {state.cart.length > 0 && state.cart.map((cart,i) => {
            return(
                <div className="profil" key={i}>
                    <img src={`${BASE_URL}/img/${cart.url}`} width = "20%" alt={cart.caption} />
                    <p>{cart.name} : {cart.description}</p>
                    <p>{cart.price}€ / Mois</p>
                    <button className="btn-delete" onClick={() => handleDelete(cart.id)}>Supprimer du panier</button>
                </div>
            )
        })}
         <button className="btn-valid" onClick={handleSubmit}>Valider mon panier</button>
                {isValidated && <p>Merci pour votre commande ! </p>}
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