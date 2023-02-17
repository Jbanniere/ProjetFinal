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


}

export default Avis