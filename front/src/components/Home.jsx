import { useEffect, useState, Fragment, useContext } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { StoreContext } from "../tools/context.js"
import CardProductCarousel from './CardProductCarousel.jsx';


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
            <div className="home__presentation">
                <div className="home-presentation">
                    <img className="home-presentation-logo" src={`${BASE_URL}/image/pioupiou.png`} alt="nom du magazine piou piou"/>
                    <span> & </span>
                    <img className="home-presentation-logo" src={`${BASE_URL}/image/pomme.png`} alt="nom du magazine pomme"/>
                </div>
                <div className="home-presentation-txt">
                    <p><strong>Nos magazines mensuels pour vos TOUT PETITS</strong></p>
                    <p>Chaque mois votre enfant va découvrir un monde rempli de couleurs, de formes et de personnages amusants,
                    conçus pour stimuler son imagination et sa curiosité. Alors préparez-vous à vivre de nouvelles aventures en 
                    famille ! </p>
                </div>
                <img className="home-presentation-peach" src={`${BASE_URL}/image/peach.png`} alt="peach"/>
                <img className="home-presentation-ellipse" src={`${BASE_URL}/image/ellipse2.png`} alt="ellipse"/>
            </div>
            <div>
                <p className="fil-ariane">Accueil</p>
            </div>
            
        <CardProductCarousel products={allProduct} />
        
            <div>
                <img className="child-img" src={`${BASE_URL}/image/children.jpg`} alt="livre enfant"/>
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