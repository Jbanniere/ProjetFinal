class Pictures {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }


////////// READ //////////

    // Sélectionner toutes les images
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

    // Sélectionner un produit par son ID
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

}
export default Pictures