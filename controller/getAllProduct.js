import BDD from '../model/BDD.js'
import Products from '../model/Products.js'

export default async (req,res) => {
    const {name, description, price_solo, price_hs, id} = req.body
    try {
        const myBDD = new BDD()
        const product = new Products(myBDD)
        const allProduct = await product.getAllProduct({name, description, price_solo, price_hs, id})
        res.json({allProduct})
        
        
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}