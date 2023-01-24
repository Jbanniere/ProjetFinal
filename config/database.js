import mysql from "mysql";

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "juliebannier", // identifiant BDD
    password: "129d2bbb05a3668f63e0154d52eae7f2", // le password
    database: "", // nom de la base de donnée
});