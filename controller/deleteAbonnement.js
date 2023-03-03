import BDD from '../model/BDD.js'
import Abonnement from '../model/Abonnement.js'

export default async (req,res) => {
    const {id} = req.body
    const myBDD = new BDD()
    const abo = await new Abonnement(myBDD)
    const result = await abo.addAbonnement({id})
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