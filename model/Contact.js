class Contact {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
    
////////// CREATE ////////////

 async newContact({nom, prenom, email, message}) {
        if(!nom || !prenom|| !email || !message){
            return null
        }
        const sql = 'INSERT INTO contact (nom, prenom, email, message) VALUES (?,?,?,?)'
        const paramsSql = [nom, prenom, email, message]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
}

export default Contact