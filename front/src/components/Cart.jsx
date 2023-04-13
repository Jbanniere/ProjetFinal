import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, useEffect } from "react"
import { StoreContext } from "../tools/context.js"
import axios from "axios"
import { Navigate } from "react-router-dom"


const Cart = () => {
    const [state, dispatch] = useContext(StoreContext)
//    const [qte, setQte] = useState(0)
    const user_id = state.user.id
    const [isValidated, setIsValidated] = useState(false)
//    const [abonnement, setAbonnement] = useState({ user_id: user_id })
    
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
    
    // Pour valider l'abonnement et envoyer les infos en BDD et vider le reducer
    const handleSubmit = () => {
        axios.post(`${BASE_URL}/addAbonnement`, {
            user_id: user_id,
        })
        .then(res => {
           setIsValidated(true)
           dispatch({
               type:"INIT_CART",
               payload:[]
               
           })
       })
       .catch(err => console.log(err))
    }
   
    return(
        <Fragment>
        <h1>Mon Panier</h1>
        {state.cart.length === 0 && <p className="error-txt">Votre panier est vide</p>}
        {state.cart.length > 0 && state.cart.map((cart,i) => {
            return(
            <Fragment>
                <div className="cart" key={i}>
                    <img className= "cart-cover" src={`${BASE_URL}/img/${cart.url}`} alt={cart.caption} />
                    <p>{cart.name} : {cart.description}</p>
                    <p className="cart-prix prix">{cart.price}€ / Mois</p>
                    <button className="btn-delete" onClick={() => handleDelete(cart.id)}>Supprimer du panier</button>
                </div>
                <button className="btn-valid" onClick={handleSubmit}>Valider mon panier</button>
            </Fragment>
            )
            
        })}
        {isValidated && <Navigate to="/orderSuccess" />}
        </Fragment>
    )  
}

export default Cart