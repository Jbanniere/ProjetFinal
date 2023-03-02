import {useEffect, useState, Fragment, useContext} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {NavLink} from "react-router-dom"
import {StoreContext} from "../tools/context.js"


const Accueil = () => {
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
    
    return(
        <Fragment>
            <p>Accueil</p>
            <img src={`${BASE_URL}/image/pioupiou.png`} width= "5%" alt="nom du magazine piou piou"/>
            <span> & </span>
            <img src={`${BASE_URL}/image/pomme.png`} width= "5%" alt="nom du magazine pomme"/>
            <p>Nos magazines mensuels pour vos TOUT PETITS</p>
            <p>Chaque mois votre enfant va découvrir un monde rempli de couleurs, de formes et de personnages amusants,
            conçus pour stimuler son imagination et sa curiosité. Alors préparez-vous à vivre de nouvelles aventures en 
            famille ! </p>
            
        </Fragment>
        )
}

export default Accueil