class Avis {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }


///////////////////////////////////////// CREATE ////////////////////////////////////////////

    async addAvis({user_id, product_id, content, note}) {
        if(!content || !note){
            return null
        }
        const sql = 'INSERT INTO avis (user_id, product_id, content, note, date) VALUES (?,?,?,?,NOW())'
        const paramsSql = [user_id, product_id, content, note]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }

////////////////////////////////////// READ ////////////////////////////////////////////////
    
    //Sélectionne les avis en fonction du produit
     async getAllAvisByProductId({product_id}) {
        const sql = `
        SELECT avis.*, users.nom, users.prenom 
        FROM users 
        JOIN avis 
        ON users.id = avis.user_id 
        WHERE avis.product_id = ?`
        const paramsSql = [product_id]
         try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    // Sélectionne les notes par le product id
    async getNoteByProductId({product_id}) {
        const sql = "SELECT note FROM avis WHERE product_id=?"
        const paramsSql = [product_id]
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    // Selectionne les avis en fonction du user_id
    async getAvisByUserId({user_id}) {
        const sql = `
        SELECT avis.*, products.name 
        FROM avis 
        JOIN products
        ON products.id = avis.product_id
        WHERE user_id = ?`
        const paramsSql = [user_id]
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    
////////////////////////////////////// UPDATE ////////////////////////////////////////////////

    async updateAvis({content, note, id}){
        const sql = "UPDATE products SET content = ?, note = ? WHERE id = ?"
        const paramsSql = [content, note, id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }



////////////////////////////////////// DELETE ////////////////////////////////////////////////

    async deleteAvis({id}){
        console.log(id)
        const sql = "DELETE FROM avis WHERE id = ?"
         try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }

}

export default Avis