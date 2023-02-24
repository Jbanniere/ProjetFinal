class Cart {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
/////////////////////////// CREATE ////////////////////////////////////
    async addToCart({user_id, date}) {
        const sql = 'INSERT INTO order (user_id, date) VALUES (?,NOW())'
        const paramsSql = [user_id, date]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

export default Cart