import { useEffect, useState, Fragment } from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import { useParams, NavLink } from "react-router-dom"
import { moyenne } from '../tools/moyenne.js'
import AvisPro from "./AvisPro.jsx"
import Abonnements from "./Abonnements.jsx"


const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState([])
    const [note, setNote] = useState([])
    const {id} = useParams()
    const product_id = id
    
    //Je récupère les infos des produits via leur id
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setProductDetails(res.data.result.result))
            .catch(err => console.log(err))
    }, [id])
    

    // Je récupère les notes de mes avis via le product_id
    useEffect(() => {
        axios.post(`${BASE_URL}/getNoteByProductID`,{product_id})
        .then(res => setNote(res.data.result.result))
        .catch(err => console.log(err))
    }, [product_id])
    
    
    // Je map note pour récupérer un tableau avec mes notes
    const listeNotes = note.map(item => item.note)
    // je fais la moyenne des notes, et je fixe le nombre de chiffres après la virgule à 1
    const moyenneNote = moyenne(listeNotes).toFixed(1)
    return(
        <Fragment>
            <div className="product-details">
                <div className="flex">
                    <img className="child-img" src={`${BASE_URL}/image/baby_book.png`} alt="bébé avec un livre" />
                    <img className="child-img desktop" src={`${BASE_URL}/image/baby-read.png`} alt="bébé avec un livre" />
                </div>
                {productDetails.map((details,i) => {
                    return(
                    <div key={i}>
                        <div className="product__title flex">
                            <h2 className="product-title">{details.description}</h2>
                            <img className="bee-img" src={`${BASE_URL}/image/bee.png`} alt="abeille qui vole" />
                        </div>
                        <div className="flex justify-center">
                            <img className="product-details-cover" src={`${BASE_URL}/img/${details.url}`} alt={details.caption} />
                        </div>
                        <div className="flex align-center justify-center">
                            <img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" />
                            <img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" />
                            <img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" />
                            <img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" />
                            <img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" />
                            <p className="strong-font"><NavLink to={`/getAllAvis/${details.id}`}>{moyenneNote}/5</NavLink></p>
                            <button className="btn-valid"><NavLink to={`/addAvis/${details.id}`} title="Donner mon avis">Donner mon avis</NavLink></button>
                        </div>
                    </div>
                    )
                })}
                <div className="txt__accroche flex align-center direction-column">
                    <p className= "txt-accroche">Des images éducatives et des activités ludiques pour un éveil sensoriel et intellectuel.</p>
                    <p className= "txt-accroche">Des histoires courtes, des activités ludiques et des images éducatives pour les petits.</p>
                    <p className= "txt-accroche">Notre magazine pour les tout petits : un moment de partage en famille à ne pas manquer.</p>
                </div>
                <AvisPro />
                <Abonnements id={id} product={productDetails[0]} />
            </div>
        </Fragment>
        )
}

export default ProductDetails