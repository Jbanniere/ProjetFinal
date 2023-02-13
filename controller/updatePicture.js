import BDD from '../model/BDD.js'
import Pictures from '../model/Pictures.js'

export default async (req,res) => {
    const {files, product_id, url} = req.body
    console.log(req.body)
    
    try {
        const myBDD = new BDD()
        const picture = await new Pictures(myBDD)
        const result = await picture.updatePictureByProductId({oldURL:url, newUrl:files, product_id})
        if(!result){
            return res.status(500).json({error:'Merci de remplir tous les champs '})
        }
        res.json({result})
        console.log(result)
        
    } catch(err) {
        console.log(err);
        res.sendStatus(500)
    }
}