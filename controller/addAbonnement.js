import BDD from '../model/BDD.js'
import Abonnement from '../model/Abonnement.js'
import Cart from '../model/Cart.js'

export default async (req,res) => {
    const {user_id} = req.body
    const myBDD = new BDD()
    const abo = await new Abonnement(myBDD)
    const result = await abo.addAbonnement({user_id})
    const cart = new Cart(myBDD)
    await cart.clearCartProduct({user_id})
    
    try {
        res.json({result})
 
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}