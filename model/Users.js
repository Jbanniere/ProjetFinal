import bcrypt from "bcrypt"

class Users {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
        this.saltRounds = 10
    }
    
    
//////////////////////////////////////// CREATE /////////////////////////////////////

// Méthode pour indiquer (true/false) si un email est présent dans la bdd
    async emailInBdd (email) {
         try {
            const sql = "SELECT * FROM users WHERE email = ?"
            const result  = await this.asyncQuery(sql,[email])
                if(result.length > 0) return result
                return false
        } catch(err){
            return
        }
    }
    
// Méthode pour se connecter
    async login({email, password}) {
        const dataBDD = await this.emailInBdd(email)
        if(!dataBDD[0]){
            return {response: "email ou mot de passe invalide"}
        }
            
        const passwordIsValide = await bcrypt.compare(password,dataBDD[0].password)
            
        if(!passwordIsValide){
            return{response: "email ou mot de passe invalide"}
        }
            
        return dataBDD
    }
    


// Méthode pour valider l'inscription
    async register({nom, prenom, adresse, email, password}) {
        const sql = "INSERT INTO users (nom, prenom, adresse, email, password, role_id) VALUES (?,?,?,?,?,?)"
        
        if(password.length <= 8){
            return {response:'Le mot de passe doit faire plus de 8 caractères'}
        }
        if(!nom || !prenom || !adresse || !email|| !password){
            return null
        }
        
        try {
             // On vérifie si l'email est déjà présent dans la BDD
            const emailExist = await this.emailInBdd(email)
        
            // erreur a la vérification de l'email
            if(emailExist === undefined){
                return
            }
            
            // Cas email déjà présent en BDD
            if(emailExist === true) {
                return {response:'Cet email existe déjà'}
            }
            
            // Cas email non présent : on hash le password
            const mpdHash = await bcrypt.hash(password,this.saltRounds)
            
            // Création de la liste des params pour créer notre user
            const paramsSql = [nom, prenom, adresse, email, mpdHash, 2]
            
            // On fait la requête
            const createUser = await this.asyncQuery(sql,paramsSql)
            
            // On retourne la reponse
            return {response:createUser}
        } catch(err) {
            console.log(err)
            return
        }
    }
    
    
//////////////////////////////////////// READ //////////////////////////////////////

 async getAllUsers () {
         const sql = "SELECT * FROM users"
        try {
            const result = await this.asyncQuery(sql)
            return {result}
            console.log(result)
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    // Sélectionner un user par son ID
    async getUserById ({id}) {
        const sql = 'SELECT * FROM users WHERE id = ?'
        try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
////////////////////////////////////// UPDATE //////////////////////////////////////////

     async updateUser({id, nom, prenom, adresse, email, role_id}){
        const sql = "UPDATE users SET nom = ?, prenom = ?, adresse = ?, email = ?, role_id = ? WHERE id = ?"
        const paramsSql = [nom, prenom, adresse, email, role_id, id]
        
        try{
            const result = await this.asyncQuery(sql,paramsSql)
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
    
///////////////////////////////////// DELETE //////////////////////////////////////////

    async deleteUser({id}){
        const sql = "DELETE FROM users WHERE id=?"
         try{
            const result = await this.asyncQuery(sql,[id])
            return {result}
        } catch(err){
            console.log(err)
            return err
        }
    }
    
}



export default Users