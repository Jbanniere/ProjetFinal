import BDD from '../model/BDD.js'
import Pictures from '../model/Pictures.js'

export default async (req,res) => {
    const {id} = req.body
    
    try {
        const myBDD = new BDD()
        const picture = new Pictures(myBDD)
        const result = await picture.getPicturesById({id})
        res.json({result})
        
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }

}