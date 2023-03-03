import BDD from '../model/BDD.js'
import Cart from '../model/Cart.js'

export default async (req,res) => {
    const {quantity, user_id, product_id} = req.body
    console.log(req.body)
    try {
        const myBDD = new BDD()
        const cart = await new Cart(myBDD)
        const result = await cart.updateCart({quantity, user_id, product_id})

        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}