class Avis {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
        this.saltRounds = 10
    }


///////////////////////////////////////// CREATE ////////////////////////////////////////////

    async addAvis({content, note, date}) {
        if(!content || !note|| !date){
            return null
        }
        const sql = 'INSERT INTO avis (content, note, date) VALUES (?,?,?)'
        const paramsSql = [content, note, date]
        
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