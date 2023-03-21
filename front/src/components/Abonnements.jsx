import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, useEffect } from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import { Navigate } from "react-router-dom"

const Abonnements = ({product, id}) => {
    const [state, dispatch] = useContext(StoreContext)
    const [qte, setQte] = useState(1)
    const [isValidated, setIsValidated] = useState(false)
    const [isRedirected, setIsRedirected] = useState(false)
    const [updateCart, setUpdateCart] = useState(null)
    const user_id = state.user.id
    
        const updateStateCart = (cart) => {
            dispatch({
                type:'UPDATE_CART',
                payload: cart
            })
        }
        
      /* useEffect(() => {
        axios.post(`${BASE_URL}/getPictByProductInCartByUserId`,{user_id})
            .then(res => console.log(res.data.result.result))
            .catch(err => console.log(err))
        }, [user_id])*/


        const addToCart = (item) => {
            if(state.user.isLogged) {
                // On crée d'une copie du state cart
                const cart = [...state.cart]
                // On regarde si le produit est déjà dans le panier
                const existingItem = itemIsInCart(item.id);
                // S'il est déjà présent on modifie la quantité
                if (existingItem) {
                    addQuantity(existingItem.id, item.quantity)
                // Sinon on rajoute le produit au panier 
                } else {
                    item.quantity = qte
                    cart.push(item)
                    axios.post(`${BASE_URL}/addToCart`,{
                        user_id:state.user.id,
                        product_id:id,
                        quantity:qte
                    })
                    .then(() => setIsValidated(true))
                    .catch(e => console.log(e))
                    updateStateCart(cart)
                }
            } else {
                alert("Oups! Vous devez être connecté pour ajouter un produit au panier")
                setIsRedirected(true)
            }
        }
        
        // Fonctions qui servent pour le addToCart
        // on regarde si le produit est deja dans le panier
        const itemIsInCart = (id) => {
            return state.cart.find(item => item.id == id);
        }
        
        const addQuantity = (item_id) => {
            // on creer une copie du state cart
            let totalQte = 0
            const cart = [...state.cart]
            // on regarde si le produit est deja dans le panier
            cart.map((item,i) => {
                if (item.id === item_id) {
                    totalQte = item.quantity += qte
                    return item.quantity += qte
                }
            })
            axios.post(`${BASE_URL}/updateCart`,{
                user_id:state.user.id,
                product_id:item_id, 
                quantity:totalQte
            })
            .then(res => console.log(res))
            .catch(e => console.log(e))
            updateStateCart(cart)
        }
    
    
    return(
        <Fragment>
        <div className="abonnement">
            <h2 className="h2-perso">Rejoignez-nous !</h2>
            <table className="table-abonnement">
                <thead>
                    <tr>
                        <th>Abonnement Mensuel</th>
                    </tr>
                </thead>
                {state.products.map((product,i)=>{
                    if(product.id == id) {
                        return(
                         <tbody key={i}>
                            <tr>
                                <td>
                                    <img className="abo-img cover-img" width="60%" src={`${BASE_URL}/img/${product.url}`} alt="couverture magazine" />
                                </td>
                            </tr>
                        <tr>
                            <td>1 mensuel / mois</td>
                        </tr>
                        <tr>
                            <td>Sans engagement de durée</td>
                        </tr>
                        <tr>
                            <td>
                                <p className="prix">{product.price}€ / Mois</p>
                                {state.products.filter(e => e.id == id).map((cart,i) => {
                                    return(
                                    <div key={i}>
                                        {!itemIsInCart(cart.id) && (
                                            <Fragment>
                                                <button className="btn-product-qte" onClick={() => setQte(qte => qte-1)}>-</button>
                                                <strong id="quantite" >1</strong>
                                                <button className="btn-product-qte" onClick={() => setQte(value => value+1)}>+</button>
                                                <button className= "btn-valid" onClick={() => addToCart(product)}>Ajouter au panier</button>
                                            </Fragment>
                                        )}
                                        {itemIsInCart(cart.id) &&(
                                            <p>Ce produit est déjà présent dans votre panier</p>
                                        )}
                                    </div>
                                    )
                                })}
                            </td>
                         </tr>
                    </tbody>
                    )
                }
                })}
                </table>
            {isValidated && <Navigate to="/cart" />}
            {isRedirected && <Navigate to="/login" />}
           </div>
        </Fragment>
        )
}

export default Abonnements