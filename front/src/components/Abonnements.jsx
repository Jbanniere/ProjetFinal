import { BASE_URL } from '../tools/constante.js'
import { Fragment, useState, useContext, } from "react"
import {StoreContext} from "../tools/context.js"
import axios from "axios"

const Abonnements = ({product}) => {
    const [state, dispatch] = useContext(StoreContext)
    const [qte, setQte] = useState({seul:0,pack:0})
    const [isValidated, setIsValidated] = useState(false)

    // Gestion des boutons + - et de la qté
    const handleClick = (element, type) => {
        const {name} = element.target
        let quantite = qte[type]

        if(name === "add"){
            quantite++
        }
        
        if(name === "remove" && quantite > 0){
            quantite--
        }
        
        setQte({...qte, [type]:quantite})
    }
    
    // J'ajoute mon panier 1) dans le reducer 2) dans la table CART
    const addToCart = (element, prix) => {
        let result = {
            prix: prix,
            quantite: qte.seul,
            product: product.id,
            name: product.name,
            total: Number(qte.seul)*prix
        }
        dispatch({
            type: "ADD_TO_CART",
            payload : result
        })
        
        axios.post(`${BASE_URL}/addToCart`,{
            user_id:state.user.id,
            product_id: product.id,
            quantity: qte.seul
       })
       .then(res => {
           setIsValidated(true)
           console.log(res)
           
       })
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
                        <td>
                            <img width="30%" src={`${BASE_URL}/image/mensuelpiou.png`} alt="mensuel + hors série" />
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
                            <p>5,95€ / Mois</p>
                            <button className="product-qte" name="remove" onClick={(e) => handleClick(e,"seul")}>-</button>
                            <strong id="quantite" >{qte.seul}</strong>
                            <button className="btn-product-qte" name="add" onClick={(e) => handleClick(e,"seul")}>+</button>
                            <button onClick={(e) => addToCart(e, product.price)}>Ajouter au panier</button>
                        </td>
                        {/*<td>
                            <p>6,95€ / Mois</p>
                            <button className="product-qte" name="remove" onClick={(e) => handleClick(e,"pack")}>-</button>
                            <strong id="quantite" >{qte.pack}</strong>
                            <button className="btn-product-qte" name="add" onClick={(e) => handleClick(e,"pack")}>+</button>
                            <button onClick={(e) => addToCart(e, product.price)}>Ajouter au panier</button>
                        </td>*/}
                     </tr>
                </tbody>
            </table>
            {isValidated && (
                <p>Votre produit a bien été ajouté au panier</p>
            )}
           
        </Fragment>
        )
}

export default Abonnements