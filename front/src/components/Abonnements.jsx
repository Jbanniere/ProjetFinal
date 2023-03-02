import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext } from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"
import { Navigate } from "react-router-dom"

const Abonnements = ({product, id}) => {
    const [state, dispatch] = useContext(StoreContext)
    // const [qte, setQte] = useState({seul:0,pack:0})
    const [qte, setQte] = useState(0)
    const [isValidated, setIsValidated] = useState(false)
    const [isRedirected, setIsRedirected] = useState(false)
    
        const updateStateCart = (cart) => {
            dispatch({
                type:'UPDATE_CART',
                payload: cart
            })
        }
        
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
                    cart.push(item);
                    // ajouter le produit en BDD
                    updateStateCart(cart)
                }
            } else {
                alert("Oups! Vous devez être connecté pour ajouter un produit au panier")
                setIsRedirected(true)
            }
        }
        // Fonction qui servent pour le addToCart
        // on regarde si le produit est deja dans le panier
        const itemIsInCart = (id) => {
            return state.cart.find(item => item.id === id);
        }
        
        const addQuantity = (item_id) => {
            // on creer une copie du state cart
            const cart = [...state.cart]
            // on regarde si le produit est deja dans le panier
            cart.map((item,i) => {
                if (item.id === item_id) {
                    return item.quantity += qte
                }
            })
            // mettre a jour la qte en BDD
            updateStateCart(cart)
        }
    
    
    return(
        <Fragment>
            <h2>Rejoignez la tribu !</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mensuel seul</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    {state.products.map((product,i)=>{
                        if(product.id == id) {
                            return(
                            <td key={i}>
                                <img width="60%" src={`${BASE_URL}/img/${product.url}`} alt="couverture magazine" />
                            </td>
                            )
                        }
                    })}
                    </tr>
                    <tr>
                        <td>1 mensuel / mois</td>
                    </tr>
                    <tr>
                        <td>Sans engagement de durée</td>
                    </tr>
                    <tr>
                        <td>
                            <p>5,95€ / Mois</p>
                            <button className="btn-product-qte" onClick={() => setQte(qte => qte-1)}>-</button>
                            <strong id="quantite" >{qte}</strong>
                            <button className="btn-product-qte" onClick={() => setQte(value => value+1)}>+</button>
                            <button onClick={() => addToCart(product)}>Ajouter au panier</button>
                        </td>
                     </tr>
                </tbody>
            </table>
            {isValidated && <p>Votre produit a bien été ajouté au panier</p>}
            {isRedirected && <Navigate to="/login" />}
           
        </Fragment>
        )
}

export default Abonnements