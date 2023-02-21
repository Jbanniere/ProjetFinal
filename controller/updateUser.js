import BDD from '../model/BDD.js'
import Users from '../model/Users.js'

export default async (req,res) => {
    const {id, nom, prenom, street, zip, city, email, role_id} = req.body
    console.log(req.body)
    try {
        const myBDD = new BDD()
        const user = await new Users (myBDD)
        const result = await user.updateUser({id, nom, prenom, street, zip, city, email, role_id})

        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}