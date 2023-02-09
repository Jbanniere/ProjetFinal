import BDD from '../model/BDD.js'
import Users from '../model/Users.js'

export default async (req,res) => {
    const {nom, prenom, adresse, email, password} = req.body
    const myBDD = new BDD()
    const user = await new Users(myBDD)
    const result = await user.register({nom, prenom, adresse, email, password})
    if(!result){
            return res.status(500).json({error:`Merci de remplir tous les champs`})
    }
    try {
        res.json({result})
        /*res.send(`
        <h2>Welcome ${prenom} ${nom}</h2>
        <p>Votre inscription est validée ! </p>`)*/

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}