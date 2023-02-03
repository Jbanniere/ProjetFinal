import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "juliebannier", // identifiant BDD
    password: "129d2bbb05a3668f63e0154d52eae7f2", // le password
    database: "juliebannier_tutotest", // nom de la base de donnée
});


// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params = []) => {
    return new Promise((resolve, reject)=>{
        pool.query(sql,params, (error, elements)=>{
            if(error){
                return reject(error);
            }
            return resolve(elements);
        });
    });
}