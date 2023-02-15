import fs from "fs"
import path from "path"
import dirname from "path"

class Pictures {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }


///////////////////////////// READ /////////////////////////////

    // Sélectionne toutes les images
    async getAllPictures(){
        const sql = "SELECT * FROM pictures"
        try {
            const result = await this.asyncQuery(sql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }

    // Sélectionne une image par son ID
    async getPicturesById ({id}) {
        const sql = 'SELECT * FROM pictures WHERE id = ?'
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    // Sélectionne une image par son product id
    async getPicturesByProductId ({product_id}) {
        const sql = 'SELECT * FROM pictures WHERE product_id = ?'
        try{
            const result = await this.asyncQuery(sql,[product_id])
            console.log(result)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    

///////////////////////////////// UPDATE ///////////////////////////////////

    async updatePictureByProductId({product_id, newUrl, oldURL}){
        console.log({product_id, newUrl, oldURL})
        try{
            // await fs.unlink(path.join(dir, file))
            // await fs.unlink(path.join(`../img/`, oldURL))
            
            const sql = 'UPDATE pictures set url = ? WHERE product_id = ?'
            const params = [newUrl, product_id]
            const update = await this.asyncQuery(sql,params)
            return {result: update}
        } catch(e){
            console.log(e)
            return {error:e}
        }
    }
    
////////////////////////////// DELETE /////////////////////////////////////////

    async deleteFiles(imageNames) {
        const rootPath = process.cwd();
        for (const imageName of imageNames) {
            const imagePath = path.join(rootPath, 'public', 'img', imageName);
            try {
                await fs.promises.unlink(imagePath);
            } catch (e) {
                console.error(`Failed to delete image '${imageName}'`, e);
                throw e;
            }
        }
    }


}
export default Pictures