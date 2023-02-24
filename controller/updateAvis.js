import BDD from '../model/BDD.js'
import Avis from '../model/Avis.js'

export default async (req,res) => {
    const {content, note, id} = req.body
    console.log(req.body)
    try {
        const myBDD = new BDD()
        const avis = await new Avis(myBDD)
        const result = await avis.updateAvis({content, note, id})

        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}