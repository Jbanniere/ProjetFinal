import BDD from '../model/BDD.js'
import Users from '../model/Users.js'

export default async (req,res) => {
    const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const user = await new Users(myBDD)
        const result = await user.deleteUser({id})
        res.json({result})

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}