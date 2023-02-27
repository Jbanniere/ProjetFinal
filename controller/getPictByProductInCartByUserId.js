import BDD from '../model/BDD.js'
import Cart from '../model/Cart.js'

export default async (req,res) => {
    const {user_id} = req.body
    console.log(req.body)
    try {
        const myBDD = new BDD()
        const cart = await new Cart(myBDD)
        const result = await cart.getPictByProductInCartByUserId({user_id})
        res.json({result})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}