import BDD from '../model/BDD.js'
import Contact from '../model/Contact.js'

export default async (res,req) => {
    const {nom, prenom, email, message} = req.body
    console.log(req.body)
    const myBDD = new BDD()
    const contact = await new Contact(myBDD)
    const result = await contact.newContact({nom, prenom, email, message})
    if(!result){
        return res.status(500).json({error:`Merci de remplir tous les champs`})
    }
    
    try {
        res.json({result})
        console.log(result)
      
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}