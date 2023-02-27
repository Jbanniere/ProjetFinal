import BDD from '../model/BDD.js'
import Cart from '../model/Cart.js'

export default async (req,res) => {
    const {user_id} = req.body
    try {
        const myBDD = new BDD()
        const cart = await new Cart(myBDD)
        const result = await cart.getCartByUserId({user_id})
        res.json({result})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}