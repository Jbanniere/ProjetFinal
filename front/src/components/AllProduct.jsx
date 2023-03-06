import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import { NavLink } from "react-router-dom"

const AllProduct = () => {
    const [allProduct, setAllProduct] = useState([])

    // Je récupère tous les produits
    useEffect(() => {
        axios.get(`${BASE_URL}/getAllProduct`)
            .then(res => setAllProduct(res.data.allProduct.result))
            .catch(err => console.log(err))
    },[])
    
    // Pour supprimer un produit
    const deleteProduct = (id) => {
        axios.post(`${BASE_URL}/deleteProduct`, {id})
        .then(res => setAllProduct(allProduct.filter((e)=> e.id !== id)))
        .catch(err => console.log(err))
    }

    return(
        <div>
            <h1>Mes produits</h1>
            <button className="btn-valid"><NavLink to="/addProduct"> Ajouter un nouveau produit</NavLink></button>
            {allProduct.map((product,i) => {
                return(
                <div className="profil" key={i}>
                    <h2>{product.name}</h2>
                    <p>Titre : {product.description}</p>
                    <p>Prix de l'abonnement : {product.price}€ / Mois</p>
                    <p>Images : {product.caption}</p>
                    <img src={`${BASE_URL}/img/${product.url}`} alt={product.caption} />
                    <div>
                        <button className="btn-update"><NavLink to={`/getAllAvis/${product.id}`}>Avis de {product.name}</NavLink></button>
                        <button className="btn-update"><NavLink to={`/updateProduct/${product.id}`}>Modifier les infos</NavLink></button>
                        <button className="btn-update"><NavLink to={`/updatePicture/${product.pictures_id}`}>Modifier l'image</NavLink></button>
                        <button className="btn-delete" onClick={()=> deleteProduct(product.id)}>Supprimer</button>
                    </div>
            
                </div>
                )
            })}
        </div>
        )
}

export default AllProduct