import BDD from '../model/BDD.js'
import Products from '../model/Products.js'

export default async (req,res) => {
    const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const product = await new Products(myBDD)
        const result = await product.getProductById({id})
        res.json({result})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}