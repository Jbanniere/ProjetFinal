import mysql from "mysql";

class BDD {
    constructor(){
        this.pool = mysql.createPool({
            connectionLimit : 10000,
            host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
            user: "juliebannier", // identifiant BDD
            password: "129d2bbb05a3668f63e0154d52eae7f2", // le password
            database: "juliebannier_projetfinal", // nom de la base de données
        });
    }
    
    async asyncQuery(sql, params = []){
        return new Promise((resolve, reject)=>{
            this.pool.query(sql,params, (error, elements)=>{
                if(error){
                    return reject(error);
                }
                return resolve(elements);
            });
        });
    }
}

export default BDD