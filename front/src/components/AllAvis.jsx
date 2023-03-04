import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { useParams } from "react-router-dom"
import { formatDate } from "../tools/date.js"



const AllAvis = () => {
    const [allAvis, setAllAvis] =  useState([])
    const {product_id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getAllAvisByProductId`,{product_id})
            .then(res => setAllAvis(res.data.result.result))
            .catch(err => console.log(err))
    },[product_id])
    

    
    return(
        <div>
            <h2>Ce que les abonnés en pensent</h2>
            {allAvis.map((avis,i) => {
                return(
                <div key={i}>
                    <h3>L'avis de {avis.prenom}</h3>
                    <p>{avis.note}/5 : {avis.content} - {formatDate(avis.date)}</p>
                </div>
                )
            })}
        </div>
        )
}

export default AllAvis