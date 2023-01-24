import {pool} from "../config/database.js"

export default (req,res) => {
  
  // Création d'une requête SQL pour l'utiliser ensuite dans le pool.query
        let sql = "SELECT * FROM users WHERE id = ?" // Attention ne jamais mettre de données en "dur" mais ? pour éviter l'injection SQL
        pool.query(sql,(err, result) => {
          if(err) throw err
          res.json({result})
        
    })
}