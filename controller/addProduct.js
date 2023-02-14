import BDD from '../model/BDD.js'
import Products from '../model/Products.js'
import {asyncQuery} from "../config/database.js"

export default async (req, res) => {
    console.log("uploadFiles.js")
    const {files, name, description, price_solo, price_hs} = req.body
    
    const myBDD = new BDD()
    const product = await new Products(myBDD)
    const data = await product.addProduct({name, description, price_solo, price_hs})
    if(!data.result.insertId){
        return res.status(500).json({error:'Le produit n\'a pas été crée '})
    }
    
    const sqlPicture = 'INSERT INTO pictures (url, product_id, caption) VALUES (?,?,?)'
    const paramsSQL = [files, data.result.insertId ,name]
    const result = await asyncQuery(sqlPicture,paramsSQL)
    res.json({result})
}