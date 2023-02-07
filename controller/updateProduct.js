import BDD from '..model/BDD.js'
import Products from '../model/Products.js'

export default async (req,res) => {
    try {
        const myBDD = new BDD()
        const product = await Products(myBDD)
        const data = product.updateProduct()
        res.json({data})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}