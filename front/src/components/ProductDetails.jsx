import {useEffect, useState, Fragment} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useParams, NavLink} from "react-router-dom"
import {moyenne} from '../tools/moyenne.js'


const ProductDetails = () => {
    const [productDetails, setProductDetails] = useState([])
    const [note, setNote] = useState([])
    const {id} = useParams()
    const product_id = id
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getProductById`,{id})
            .then(res => setProductDetails(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [id])
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getNoteByProductID`,{product_id})
        .then(res => setNote(res.data.result.result))
        .catch(err => console.log(err))
    }, [product_id])
    
    console.log(note)
    
    const listeNotes = note.map(item => item.note)
    const moyenneNote = moyenne(listeNotes)
    
    console.log(moyenneNote)
    
    
    return(
        <Fragment>
        {productDetails.map((details,i) => {
            return(
            <div key={i}>
                <h1>{details.description}</h1>
                <img width= "5%" src={`${BASE_URL}/image/bee.png`} alt="abeille qui vole" />
                <img src={`${BASE_URL}/img/${details.url}`} alt={details.caption} />
                <div>
                    <p><NavLink to={`/getAllAvis/${details.id}`}>{moyenneNote}/5</NavLink></p>
                    <button><NavLink to={`/addAvis/${details.id}`}>Donner mon avis</NavLink></button>
                </div>
            </div>
            )
        })}
        <div>
            <p>Des images éducatives et des activités ludiques pour un éveil sensoriel et intellectuel.</p>
            <p>Des histoires courtes, des activités ludiques et des images éducatives pour les petits.</p>
            <p>Notre magazine pour les tout petits : un moment de partage en famille à ne pas manquer.</p>
        </div>
        </Fragment>
        )
}

export default ProductDetails

/*                <img src="../../public/img/star.png" alt = "étoiles pour avis"/>
*/