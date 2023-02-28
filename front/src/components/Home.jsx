import {useEffect, useState, Fragment, useContext} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"


const Home = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [allProduct, setAllProduct] = useState([])
    
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
    
     useEffect(() => {
        axios.get(`${BASE_URL}/getAllProduct`)
            .then(res => setAllProduct(res.data.allProduct.result))
            .catch(err => console.log(err))
    },[])
    
    return(
        <Fragment>
            <img src={`${BASE_URL}/image/pioupiou.png`} width= "5%" alt="nom du magazine piou piou"/>
            <span> & </span>
            <img src={`${BASE_URL}/image/pomme.png`} width= "5%" alt="nom du magazine pomme"/>
            <p>Nos magazines mensuels pour vos TOUT PETITS</p>
            <p>Chaque mois votre enfant va découvrir un monde rempli de couleurs, de formes et de personnages amusants,
            conçus pour stimuler son imagination et sa curiosité. Alors préparez-vous à vivre de nouvelles aventures en 
            famille ! </p>
            <p>Accueil</p>
            
            <div>
            {allProduct.map((product, i)=>{
            return(
                <div key={i}>
                    <img src={`${BASE_URL}/img/${product.url}`} alt={product.caption} />
                    <p>Abonnement à partir de</p>
                    <div>{product.price}€ / mois</div>
                    <button><NavLink to={`/productDetails/${product.id}`}>+ infos</NavLink></button>
                </div>
                )
            })}
            <img src={`${BASE_URL}/image/livre_accueil.jpg`} width= "30%" alt="livre enfant"/>
            </div>
            <div>
                <ul>
                    <li>Paiement 100% sécurisé</li>
                    <li>Abonnements sans engagement</li>
                    <li>Service Client à votre écoute du lundi au vendredi de 9h à 18h</li>
                </ul>
            </div>
            <img src={`${BASE_URL}/image/dog.jpg`} width= "30%" alt="illustration tête chien"/>
            
        </Fragment>
        )
}

export default Home