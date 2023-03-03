class Cart {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
//////////////////////////////////// CREATE ////////////////////////////////////////

    async addToCart({user_id, product_id, quantity}) {
        const sql = 'INSERT INTO cart (user_id, product_id, quantity) VALUES (?,?,?)'
        const paramsSql = [user_id, product_id, quantity]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
/////////////////////////////////// READ ////////////////////////////////////////////////// 

     // Selectionne le cart en fonction du user_id
    async getCartByUserId({user_id}) {
        const sql = `
        SELECT cart.*
        FROM cart
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
    
    // Sélectionne les images du produits du cart en fonction du user_id
    
     async getPictByProductInCartByUserId({user_id}) {
        const sql = `
        SELECT products.*, pictures.url, cart.* 
        FROM products 
        JOIN pictures 
        ON products.id = pictures.product_id 
        JOIN cart 
        ON products.id = cart.product_id 
        WHERE cart.user_id = ?`
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

    async updateCart({quantity, product_id, user_id}){
        const sql = "UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?"
        const paramsSql = [quantity, user_id, product_id,]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }

/////////////////////////////////// DELETE /////////////////////////////////////

    async deleteCartProduct({product_id}){
        const sql = "DELETE FROM cart WHERE product_id = ?"
        try{
            const result = await this.asyncQuery(sql,[product_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    async clearCartProduct({user_id}){
        const sql = "DELETE FROM cart WHERE user_id = ?"
        try{
            const result = await this.asyncQuery(sql,[user_id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
 
}

export default Cart