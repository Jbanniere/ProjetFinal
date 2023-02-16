import axios from "axios"
import {BASE_URL} from '../tools/constante.js'
import {useState, useContext} from "react"
import {StoreContext} from "../tools/context.js"
import {useParams} from "react-router-dom"



const AddAvis = () => {
    const [state, dispatch] = useContext(StoreContext)
    const {id} = useParams()
    const [avis, setAvis] = useState({
        user_id:state.id,
        product_id:{id},
        content:"",
        note:0
    })
    
}

export default AddAvis