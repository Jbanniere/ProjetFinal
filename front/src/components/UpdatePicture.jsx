import {useState, useEffect, Fragment} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const UpdatePicture = () => {
    const [updatePicture, setUpdatePicture] = useState(null)
    const [isValidated, setIsValidated] = useState(false)
    const {product_id} = useParams()
    
    
     useEffect(() => {
        axios.post(`${BASE_URL}/getPicturesById`,{id:product_id})
            .then(res => {
                setUpdatePicture(res.data.result.result[0])
            })
            .catch(err => console.log(err))
    }, [product_id])
    
    
    
    const submit = (e) =>{
        e.preventDefault()
        
        const dataFile = new FormData()
        const files = {...e.target.picture.files}
        
        dataFile.append('files', files[0], files[0].name)
        dataFile.append("url", updatePicture.url)
        dataFile.append("product_id", updatePicture.product_id)
        
        axios.post(`${BASE_URL}/updatePicture`, dataFile)
            .then((res)=> {
                res.data.response && console.log('succesfully upload')
                setIsValidated(true)
            })
            .catch((err) => {
                console.log(err)
        })
    } 
    
    return(
        <Fragment>
            <form onSubmit={submit} encType="multipart/form-data">
                <h2>Modifier une image</h2>
                <label name='picture'>
                    <input type='file' name='picture'/>
                </label>
                <button className="btn-valid" type="submit">Valider</button>
                {isValidated && (
                    <p className="error-txt">Votre modification a été prise en compte</p>
                )} 
            </form>
            { updatePicture && <img src={`${BASE_URL}/img/${updatePicture.url}`} alt={updatePicture.caption} />}
        </Fragment>
        )
}

export default UpdatePicture