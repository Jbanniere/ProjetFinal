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
        <div className="all-products-admin">
            <h1>Mes produits</h1>
            <button className="btn-valid"><NavLink to="/addProduct"> Ajouter un nouveau produit</NavLink></button>
            {allProduct.map((product,i) => {
                return(
                <div className="all-product-details" key={i}>
                    <h2 className="h2-perso-2">- {product.name}</h2>
                    <div className="all-products-infos">
                        <p><span className="strong-font">Titre :</span> {product.description}</p>
                        <p><span className="strong-font">Prix de l'abonnement :</span> {product.price}€ / Mois</p>
                        <p><span className="strong-font">Images :</span> {product.caption}</p>
                    </div>
                    <div className="all-product-btn">
                        <img className="all-product-img" src={`${BASE_URL}/img/${product.url}`} alt={product.caption} />
                        <div>
                            <button className="btn-update"><NavLink to={`/getAllAvis/${product.id}`}>Avis de {product.name}</NavLink></button>
                            <button className="btn-update"><NavLink to={`/updateProduct/${product.id}`}>Modifier les infos</NavLink></button>
                            <button className="btn-update"><NavLink to={`/updatePicture/${product.pictures_id}`}>Modifier l'image</NavLink></button>
                            <button className="btn-delete" onClick={()=> deleteProduct(product.id)}>Supprimer</button>
                        </div>
                    </div>
            
                </div>
                )
            })}
        </div>
        )
}

export default AllProduct