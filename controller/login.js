import BDD from '../model/BDD.js'
import bcrypt from "bcrypt"
import {generateToken} from "../config/token.js"
import Users from '../model/Users.js'


const generateResponse = async (userDataSQL) => {
    
    // ID du role Admin en BDD
    const ADMIN_ROLE_ID = 1
    
    // on vérifie si le user est admin ou non (return true /false)
    console.log(userDataSQL)
    const admin = userDataSQL.role_id === ADMIN_ROLE_ID
    
    const userData = { 
        id:userDataSQL.id,
        nom:userDataSQL.nom,
        prenom:userDataSQL.prenom,
        email:userDataSQL.email,
        role_id:userDataSQL.role_id,
        user:true,
        admin
    }
    try {
        const token = await generateToken(userData)
        return {response:true, token, user:userData }
    } catch(err){
        console.log(err)
        return
    }
}

export default async (req, res) => {
    const {password, email} = req.body
    // console.log(req.body)
    const myBDD = new BDD()
    const user = await new Users(myBDD)
    const result = await user.login({password, email})
    console.log(result)
    if(!result[0]){
        return res.status(401).json({response:"identifiant ou mot de passe incorect"})       
    }
    try {
        const response = await generateResponse(result[0])
        const resultCompare = await bcrypt.compare(password, result[0].password)
        res.json(resultCompare ? {response} : {response:null})
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}