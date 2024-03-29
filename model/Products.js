class Products {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
////////////////////////////////////// CREATE ////////////////////////////////////////

    async addProduct({name, description, price}) {
        if(!name || !name || !description || !price){
            return null
        }
        const sql = 'INSERT INTO products (name, description, price) VALUES (?,?,?)'
        const paramsSql = [name, description, price]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }

/////////////////////////////////////// READ //////////////////////////////////////

    async getAllProduct(){
        const sql = `SELECT products.*, pictures.id AS pictures_id , pictures.url, pictures.caption FROM products 
        JOIN pictures 
        ON products.id = pictures.product_id`
        try {
            const result = await this.asyncQuery(sql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
     // Sélectionner un produit par son ID
    async getProductById ({id}) {
        const sql = `
        SELECT products.*, pictures.url, pictures.caption 
        FROM products 
        JOIN pictures 
        ON products.id = pictures.product_id  
        WHERE products.id = ?`
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    

    
/////////////////////////////////////// UPDATE //////////////////////////////////

     async updateProduct({name, description, price, id}){
        const sql = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?"
        const paramsSql = [name, description, price, id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
/////////////////////////////////// DELETE /////////////////////////////////////

    async deleteProduct({id}){
        const sql = "DELETE FROM products WHERE id=?"
         try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
    
}

export default Products