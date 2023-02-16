import BDD from '../model/BDD.js'
import Contact from '../model/Contact.js'

export default async (req,res) => {
    const {nom, prenom, email, objet, message, date} = req.body
    console.log(req.body)
    
    try {
        const myBDD = new BDD()
        const contact = await new Contact(myBDD)
        const result = await contact.newContact({nom, prenom, email, objet, message, date})
            if(!result){
                return res.status(500).json({error:`Merci de remplir tous les champs`})
            }
        res.json({result})

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}