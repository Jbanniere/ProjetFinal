import bcrypt from "bcrypt"

class Users {
    constructor(bdd) {
        this.pool = bdd.pool
        this.asyncQuery = bdd.asyncQuery
        this.saltRounds = 10
    }
    
    
/////////// CREATE ////////////

// Méthode pour indiquer (true/false) si un email est présent dans la bdd
    async emailInBdd (email) {
         try {
            const sql = "SELECT * FROM users WHERE email = ?"
            const result  = await this.asyncQuery(sql,[email])
                if(result.length > 0) return true
                return false
        } catch(err){
            return
        }
    }


// Méthode pour valider l'inscription
    async register({nom, prenom, adresse, email, password}) {
        const sql = "INSERT INTO users (nom, prenom, adresse, email, password, role_id) VALUES (?,?,?,?,?,?)"
        
        if(password.length <= 8){
            return {response:'Le mot de passe doit faire plus de 8 caractères'}
        }
        
        try {
             // On vérifie si l'email est déjà présent dans la BDD
            const emailExist = await this.emailInBdd(email)
        
            // error a la vérification de l'email
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
            const paramsSql = [nom, prenom, adresse, email, mpdHash, 1]
            
            // On fait la requête
            const createUser = await this.asyncQuery(sql,paramsSql)
            
            // On retourne la reponse
            return {response:createUser}
        } catch(err) {
            console.log(err)
            return
        }
    }

}