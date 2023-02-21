import BDD from '../model/BDD.js'
import Users from '../model/Users.js'

export default async (req,res) => {
    const {id, nom, prenom, street, zip, city, email, password, role_id} = req.body
    
    try {
        const myBDD = new BDD()
        const user = new Users(myBDD)
        const result = await user.getAllUsers({id, nom, prenom, street, zip, city, email, password, role_id})
        res.json({result})
        
        
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}