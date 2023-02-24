import BDD from '../model/BDD.js'
import Avis from '../model/Avis.js'

export default async (req,res) => {
    const {id} = req.body
    console.log(id)
    
    try {
        const myBDD = new BDD()
        const avis = new Avis(myBDD)
        const result = await avis.deleteAvis({id})
        res.json({result})

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}