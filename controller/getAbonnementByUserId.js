import BDD from '../model/BDD.js'
import Abonnement from '../model/Abonnement.js'

export default async (req,res) => {
    const {user_id} = req.body
    console.log(req.body)
    
    try {
        const myBDD = new BDD()
        const abo = new Abonnement(myBDD)
        const result = await abo.getAbonnementByUserId({user_id})
        res.json({result})
        
        
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}