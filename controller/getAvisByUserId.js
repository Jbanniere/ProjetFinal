import BDD from '../model/BDD.js'
import Avis from '../model/Avis.js'

export default async (req,res) => {
    const {user_id} = req.body
    
    try {
        const myBDD = new BDD()
        const avis = await new Avis(myBDD)
        const result = await avis.getAvisByUserId({user_id})
        res.json({result})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}