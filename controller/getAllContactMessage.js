import BDD from '../model/BDD.js'
import Contact from '../model/Contact.js'

export default async (req,res) => {
    const {nom, prenom, email, objet, message, etat, id} = req.body
    
        
    try {
        const myBDD = new BDD()
        const contact = new Contact(myBDD)
        const result = await contact.getAllContactMessage({nom, prenom, email, objet, message, etat, id})
        res.json({result})
        console.log({result})
        
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}