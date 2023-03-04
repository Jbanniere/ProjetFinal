class Abonnement {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
    
///////////////////////////////////////// CREATE ////////////////////////////////////////////
    async addAbonnement({user_id}) {
        console.log(user_id)
        const paramsSql = [] //user_id, product_id
        
        const sql = "SELECT * FROM cart WHERE user_id = ?"
        
        try {
            const result = await this.asyncQuery(sql, [user_id])
            result.forEach(e => {
                paramsSql.push([user_id,e.product_id])
            })
        } catch (err) {
            console.log(err)
        }
        
        const sql2 = 'INSERT INTO abonnement (user_id, product_id) VALUES ?'
        
        
        try {
            const result = await this.asyncQuery(sql2, [paramsSql])
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
////////////////////////////////////// READ ////////////////////////////////////////////////

    // Sélectionner un abonnement en fonction du user_id
    async getAbonnementByUserId ({user_id}) {
        const sql = `
        SELECT abonnement.*, products.name, products.price, pictures.url
        FROM abonnement
        JOIN products
        ON abonnement.product_id = products.id
        JOIN pictures
        ON pictures.product_id = products.id
        WHERE user_id = ?`
        try{
            const result = await this.asyncQuery(sql,[user_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
////////////////////////////////////// DELETE ////////////////////////////////////////////////

    async deleteAbonnement({id}){
        console.log(id)
        const sql = "DELETE FROM abonnement WHERE id = ?"
         try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }

}

export default Abonnement