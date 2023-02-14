import BDD from '../model/BDD.js'
import Contact from '../model/Contact.js'

export default async (req,res) => {
    const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const contact = await new Contact(myBDD)
        const result = await contact.getContactMessageById({id})
        res.json({result})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}