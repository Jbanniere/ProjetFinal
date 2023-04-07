import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { useParams } from "react-router-dom"
import { formatDate } from "../tools/date.js"
import { moyenne } from '../tools/moyenne.js'


const AllAvis = () => {
    const [allAvis, setAllAvis] =  useState([])
    const [note, setNote] = useState([])
    const {product_id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getAllAvisByProductId`,{product_id})
            .then(res => setAllAvis(res.data.result.result))
            .catch(err => console.log(err))
    },[product_id])
    
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
        <div className="all-avis">
            <h1 className="contact-title">Ce que les abonnés en pensent</h1>
            <p className="strong-font"><img className="img-star" src={`${BASE_URL}/image/star.png`} alt="star" /> {moyenneNote} / 5</p>
            {allAvis.map((avis,i) => {
                return(
                <div className="avis" key={i}>
                    <h3>L'avis de {avis.prenom}</h3>
                    <p>{avis.note}/5 : {avis.content}</p>
                    <p>{formatDate(avis.date)}</p>
                </div>
                )
            })}
        </div>
        )
}

export default AllAvis