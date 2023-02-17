import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useParams, NavLink} from "react-router-dom"


const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState([])
    const {id} = useParams()

    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setProductDetails(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [id])
    
    console.log(productDetails)

    
    return(
        <div>
        {productDetails.map((details,i) => {
            return(
            <div key={i}>
                <h1>{details.name}</h1>
                <img src={`${BASE_URL}/img/${details.url}`} alt={details.caption} />
                <button><NavLink to={`/addAvis/${details.id}`}>Donner mon avis</NavLink></button>
                <button><NavLink to={`/getAllAvis/${details.id}`}>Afficher tous les avis</NavLink></button>
                <p>{details.description}</p>
                <p>Abonnement mensuel : {details.price_solo}</p>
                <p>Abonnement mensuel + hors-séries : {details.price_hs}</p>
            </div>
            )
        })}
        </div>
        )
}

export default ProductDetails

/*                <img src="../../public/img/star.png" alt = "étoiles pour avis"/>
*/