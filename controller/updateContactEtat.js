import BDD from '../model/BDD.js'
import Contact from '../model/Contact.js'

export default async (req,res) => {
    const {etat,id} = req.body
    
    try {
        const myBDD = new BDD()
        const contact = await new Contact(myBDD)
        const result = await contact.updateContactEtat({etat, id})
        if(!result){
        return res.status(500).json({error:'Merci de remplir tous les champs '})
    }
        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}