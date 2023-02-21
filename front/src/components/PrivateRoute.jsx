import {Navigate, useLocation} from "react-router-dom"
import {StoreContext} from "../tools/context.js"
import {BASE_URL} from "../tools/constante.js"
import {useEffect, useContext, useState} from 'react'
import axios from 'axios'

const PrivateRoute = ({children, auth = null}) => {
    // permet de recuperer le pathname ex: http://najs02.ide.3wa.io:3000/login => /login
    const location = useLocation().pathname;
    const [loading, setLoading] = useState(true)
    /** 
    * On récupère user qui se trouve dans notre state 
    * du reducer grâce au destructuring
    **/
    const [{user}, dispatch] = useContext(StoreContext)
    
    useEffect(() => {
        // on vérifie si l'utilisateur est déjà connecté
        if(user.id === null){
          // on récupère le token dans le localStorage
          const jwtToken = window.localStorage.getItem("jwtToken")
          // Si on a un token
          if (jwtToken) {
            // on met le token 
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwtToken}`
            // on vérifie le token puis on sauvegarde les données dans le reducer
            axios.get(`${BASE_URL}/relogged`)
            .then(res => dispatch({type:"LOGIN", payload:res.data.result}))
            .catch(e => console.log(e))
          } else { setLoading(false) }
        }
    },[])
  
    // permet de bloquer le chargement des composants si l'utilisateur n'est pas logged ou que la route est sécurisé
    useEffect(() => { if (user.id || !auth) setLoading(false) },[user, location])
    
    // On récupère les variable qui permettent de savoir si l'utilisateur est connecté et/ou admin
    const {isAdmin, isLogged} = user;
    
    // On vérifie si la route est reserveés aux admin 
    const isLimitedToAdmin = auth === "admin";
    // On vérifie si la route est reservée aux utilisateurs connectés
    const isLimitedToConnected = auth === "user";
    
    // si il n'y a pas de restrictions sur cette route
    const isPublic = auth === null
  
    /* 
    * Si la route est reservée aux admin et qu'il est connecté en tant qu'admin
    * OU
    * Si la route est reservée aux utilisateur et qu'il est connecté
    */
    const isUserAuthorized = isPublic || (isLimitedToAdmin && isAdmin) || (isLimitedToConnected && isLogged);

    if(loading) return <p>Loading</p>
  
    return isUserAuthorized ? children : <Navigate to="/login" />;
}


export default PrivateRoute