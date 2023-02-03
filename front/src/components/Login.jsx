import {useState} from "react"
import axios from "axios"
import {BASE_URL} from "../tools/constante.js"

const Login = () => {
    
    const initialState = {password:'',email:''}
    const[info , setInfo] = useState(initialState)
        
    const handleChange = (e) => {
        const {name, value} = e.target
        setInfo({...info,[name]:value})
    }
        
    const submit = (e) => {
        e.preventDefault()
        axios.post(`${BASE_URL}/login`,{
            email: info.email,
            password:info.password})
       .then(res => {
                if(res.data.response) {
                    localStorage.setItem('jwtToken', res.data.response.token)
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+res.data.response.token
                    setInfo(initialState)
                }
            })
        }

    return(
         <form onSubmit={submit}>
            <input type='text' placeholder='email' name='email' onChange={handleChange} value={info.email} />
            <input type='text' placeholder='password' name='password' onChange={handleChange} value={info.password} />
            <input type='submit' />
        </form>       
    )
}


export default Login