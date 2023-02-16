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
    
    


}

export default Avis