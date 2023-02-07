import BDD from '../model/BDD.js'
import Products from '../model/Products.js'

export default async (req,res) => {
    const {name, description, price_solo, price_hs, id} = req.body
    
    try {
        const myBDD = new BDD()
        const product = await new Products(myBDD)
        const result = await product.updateProduct({name, description, price_solo, price_hs, id})

        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}