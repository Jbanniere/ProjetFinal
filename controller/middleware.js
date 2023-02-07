import {verifyToken} from "../config/token.js"
import parseurl from 'parseurl'

const ADMIN = 'admin'
const USER = 'user'
const PUBLIC = 'public'

const protectedPath = (pathname) => {
    const adminPath = [''];
    const userPath = ['userPath'];
    
    const protectedAdmin = adminPath.includes(pathname)
    const protectedUser = userPath.includes(pathname)
    let type = protectedAdmin ? ADMIN : protectedUser ? USER : PUBLIC
    
    return type
}

const accesAutorized = (pathname, userData) => {
    const typePath = protectedPath(pathname)
    
    // être admin et accédé à une route admin
    const adminAcess = userData && userData.admin ? typePath === ADMIN : false
    
    // être connecté et accédé à une route user
    const userAcess = userData && userData.user ? typePath === USER : false
    
    // route public
    const publicAcess = typePath === PUBLIC 
    
    return (publicAcess || adminAcess || userAcess) ? true : false 

}


export default async(req, res, next) => {
    // récupère la route à laquelle on souhaite accéder
    const pathname = parseurl(req).pathname.split('/')[1];
    
    console.log(pathname)
    
    // Bear jdlsqdjsqdsq5d6sq74d654sqd4qs6d68sq4d6qs4d
    const headersAuth = req.headers['authorization']
    
    // ['Bear','jdlsqdjsqdsq5d6sq74d654sqd4qs6d68sq4d6qs4d']
    const token = headersAuth ? headersAuth.split(' ')[1] : null
    
    try{
        // on vérifie le token
        const userData = await verifyToken(token)
        // on vérifie si la route est autorisée
        const acces = accesAutorized(pathname,userData)
        // la reponse dans le cas où la route n'est pas autorisée
        const response = {response:false, msg:'accès refusé'}
        
        return acces ? next() : res.json(response)
    }catch(err) {
        console.log(err)
        res.sendStatus(401)
    }
}