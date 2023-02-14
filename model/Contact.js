class Contact {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
    }
    
    
////////// CREATE ////////////

    async newContact({nom, prenom, email, objet, message}) {
        if(!nom || !prenom|| !email || !objet|| !message){
            return null
        }
        const sql = 'INSERT INTO contact (nom, prenom, email,objet, message) VALUES (?,?,?,?,?)'
        const paramsSql = [nom, prenom, email, objet, message]
        
        try {
            const result = await this.asyncQuery(sql, paramsSql)
            return {result}
        } catch (err) {
            console.log(err)
            return err
        }
    }
    
////////// READ ////////////
    
    async getAllContactMessage() {
        const sql = 'SELECT * from contact'
         try {
            const result = await this.asyncQuery(sql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    // Sélectionner un message de contact par son ID
    async getContactMessageById ({id}) {
        const sql = 'SELECT * FROM contact WHERE id = ?'
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
////////// UPDATE ////////////

    async updateContactEtat({etat, id}){
        const sql = "UPDATE contact SET etat = ? WHERE id = ?"
        const paramsSql = [etat, id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }


////////// DELETE ////////////

    async deleteContactMessage({id}){
        const sql = "DELETE FROM contact WHERE id=?"
         try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }


    
}

export default Contact