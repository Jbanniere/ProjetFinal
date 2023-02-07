import BDD from '../model/BDD.js'
import Products from '../model/Products.js'

export default async (req,res) => {
    
    const {name, content, price_solo, price_hs} = req.body
    
        // creer une nouvelle instance de la class BDD
        const myBDD = new BDD()
        const product = await new Products(myBDD)
        const data = await product.addProduct({name, content, price_solo, price_hs})
        if(!data){
            return res.status(500).json({error:`Merci de remplir tous les champs`})
        }
    try {
        
        res.json({data})
        console.log({data})
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}