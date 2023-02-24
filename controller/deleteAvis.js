import BDD from '../model/BDD.js'
import Avis from '../model/Avis.js'

export default async (req,res) => {
    const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const user = await new Avis(myBDD)
        const result = await user.deleteAvis({id})
        res.json({result})

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}