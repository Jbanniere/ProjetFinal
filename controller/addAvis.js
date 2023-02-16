import BDD from '../model/BDD.js'
import Avis from '../model/Avis.js'

export default async (req,res) => {
    const {user_id, product_id, content, note, date} = req.body
    const myBDD = new BDD()
    const avis = await new Avis(myBDD)
    const result = await avis.addAvis({user_id, product_id, content, note, date})
    if(!result){
            return res.status(500).json({error:`Merci de remplir tous les champs`})
    }
    try {
        res.json({result})
 
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}