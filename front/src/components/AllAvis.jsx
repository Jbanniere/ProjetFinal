import {useEffect, useState} from "react"
import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useParams} from "react-router-dom"


const AllAvis = () => {
    const [allAvis, setAllAvis] =  useState([])
    const {product_id} = useParams()
    
    useEffect(() => {
        axios.post(`${BASE_URL}/getAllAvisByProductId`,{product_id})
            .then(res => setAllAvis(res.data.result.result))
            .catch(err => console.log(err))
    },[product_id])
    
    console.log(allAvis)
    
    return(
        <div>
            <h2>Ce que les abonnés en pensent</h2>
            {allAvis.map((avis,i) => {
                return(
                <div key={i}>
                    <h3>{avis.prenom}</h3>
                    <p>{avis.note}/5 : {avis.content}</p>
                </div>
                )
            })}
        </div>
        )
}

export default AllAvis