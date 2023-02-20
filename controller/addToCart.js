import BDD from '../model/BDD.js'
import Cart from '../model/Cart.js'

export default async (req,res) => {
    const {} = req.body
    console.log(req.body)
    
    try {
        const myBDD = new BDD()
        const cart = await new Cart(myBDD)
        const result = await cart.addToCart({})
            if(!result){
                return res.status(500).json({error:`Merci de remplir tous les champs`})
            }
        res.json({result})

    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}