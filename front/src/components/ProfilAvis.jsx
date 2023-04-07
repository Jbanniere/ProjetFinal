import { useEffect, useState, useContext, Fragment } from "react"
import axios from "axios"
import { BASE_URL } from '../tools/constante.js'
import { StoreContext } from "../tools/context.js"

const ProfilAvis = () => {
    const [ userAvis, setUserAvis ] = useState([])
    const [ state, dispatch ] = useContext(StoreContext)
    const [ isValidated, setIsValidated ] = useState(false)
    const user_id = state.user.id
    const id = state.user.id


    // Je récupère les avis via le user_id
    useEffect(() => {
        axios.post(`${BASE_URL}/getAvisByUserId`,{user_id})
            .then(res => setUserAvis(res.data.result.result))
            .catch(err => console.log(err))
            
    }, [user_id]) 
    
    // Pour supprimer un avis
    const deleteAvis = (idAvis) => {
        axios.post(`${BASE_URL}/deleteAvis`, {id:idAvis})
        .then(res => {
            setUserAvis(userAvis.filter((e)=> e.idAvis !== idAvis))
            setIsValidated(true)
            })
    }
    
    return(
        <Fragment>
            {state.user.role_id === 2 && (
            <Fragment>
            <h2>Mes Avis</h2>
            <div className="profil__avis flex">
                {userAvis.map((avis,i) => {
                    return(
                    <div className="profil-avis" key={i}>
                            <h3>Nom du magazine : {avis.name}</h3>
                            <p>Ma note : {avis.note}/5</p>
                            <p>Mon message : {avis.content}</p>
                        <button className="btn-delete" onClick={()=> deleteAvis(avis.id)}>Supprimer cet avis</button>
                    </div>
                    )
                })}
                </div>
                {isValidated && <p>Votre avis a bien été supprimé</p>}
            </Fragment>
            )}
            <hr />
        </Fragment>
        )
}

export default ProfilAvis