import {useEffect, useContext} from 'react' 
import axios from "axios"
import {StoreContext} from "../tools/context.js"

const Logout = () => {
    const [state, dispatch] = useContext(StoreContext)

    
     useEffect(() => {
        dispatch({type: 'LOGOUT'})
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
    },[])
    
    return(
        <div className="error-txt">
            <p>Vous avez bien été déconnecté,</p>
            <p>A bientôt ! </p>
        </div> 
    )   
}

export default Logout