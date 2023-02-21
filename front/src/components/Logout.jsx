import {useEffect} from 'react' 
import axios from "axios"
import {useState, useContext} from "react"
import {StoreContext} from "../tools/context.js"

const Logout = () => {
    const [state, dispatch] = useContext(StoreContext)

    
     useEffect(() => {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
    },[])
    
    return(
        <div>Vous avez bien été déconnecté, à bientôt</div> 
    )   
}

export default Logout