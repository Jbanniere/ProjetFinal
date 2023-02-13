import {useState, useEffect, Fragment} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const UpdatePicture = () => {
    const [updatePicture, setUpdatePicture] = useState(null)
    const {product_id} = useParams()
    
    console.log(product_id)
    
     useEffect(() => {
        axios.post(`${BASE_URL}/getPicturesById`,{id:product_id})
            .then(res => {
                console.log(res)
                setUpdatePicture(res.data.result.result[0])
            })
            .catch(err => console.log(err))
    }, [product_id])
    
    console.log(updatePicture)
    
    
    const submit = (e) =>{
        e.preventDefault()
        
        const dataFile = new FormData()
        const files = {...e.target.picture.files}
        
        dataFile.append('files', files[0], files[0].name)
        dataFile.append("url", updatePicture.url)
        dataFile.append("product_id", updatePicture.product_id)
        /*axios.post(`${BASE_URL}/updateProduct`,{...updatePicture})
            .then(res => console.log(res))
            .catch(err => console.log(err))*/
        
        axios.post(`${BASE_URL}/updatePicture`, dataFile)
            .then((res)=> {
                console.log(res)
                res.data.response && console.log('succesfully upload');
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
                <input type="submit" value="Modifier" />
            </form>
            { updatePicture && <img src={`${BASE_URL}/img/${updatePicture.url}`} alt={updatePicture.caption} />}
        </Fragment>
        )
}

export default UpdatePicture