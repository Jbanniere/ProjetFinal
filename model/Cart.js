class Cart {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
/////////////////////////// CREATE ////////////////////////////////////
    async addToCart({user_id, product_id, quantity, date}) {
        const sql = 'INSERT INTO cart (user_id, date) VALUES (?,?,?,NOW())'
        const paramsSql = [user_id, product_id, quantity, date]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
/////////////////////////// READ //////////////////////////////////// 
 
 
}

export default Cart