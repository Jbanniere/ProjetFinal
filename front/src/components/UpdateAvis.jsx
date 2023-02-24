import {useState, useEffect, useContext, Fragment} from "react"
import {useParams} from "react-router-dom"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"
import {StoreContext} from "../tools/context.js"

const UpdateAvis = () => {
    const [state, dispatch] = useContext(StoreContext)
    const [updateAvis, setUpdateAvis] = useState(null)
    const {id} = useParams()

    useEffect(() => {
        axios.post(`${BASE_URL}/getAvisById`,{id})
            .then(res => setUpdateAvis(res.data.result.result[0]))
            .catch(err => console.log(err))
    }, [id])
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setUpdateAvis({...updateAvis, [name]: value})
    }
    
    const submit = (e) =>{
        e.preventDefault()
        axios.post(`${BASE_URL}/updateAvis`,{...updateAvis})
            .then(res => console.log(res))
            .catch(err => console.log(err))
    } 
    return(
        <Fragment>
            <p>Modifier mon avis</p>
            {updateAvis.map((item,i) => {
                return(
                <div key={i}>
                <form onSubmit={submit}>
                        <p>Modifier ma note de 0 à 5 :</p>
                        <select name="note" onChange={handleChange} value={avis.note}>
                    		<option value={0}>0</option>
                    		<option value={1}>1</option>
                    		<option value={2}>2</option>
                    		<option value={3}>3</option>
                    		<option value={4}>4</option>
                    		<option value={5}>5</option>
        		        </select>
                    <label>En quelques mots : </label>
                        <textarea type="text" placeholder='Message' name='content' onChange={handleChange} value={newAvis.content} />
    		        <button type='submit'>Envoyer</button>
                </fieldset>
            </form>
                </div>
                )
            })}
        </Fragment>
        )
}

export default UpdateAvis