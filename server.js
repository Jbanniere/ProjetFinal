import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import router from "./routes/routes.js"


const app = express()
const PORT = 3001

// Cors : rendre accessible le serveur depuis l'extérieur
app.use(cors())

// BodyParser : permet de lire du JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// Pour avoir accès au dossier Public
app.use(express.static("public"));

// on appelle router pour avoir accès à toutes les routes
app.use("/", router)

// pour lancer le serveur sur le PORT correspondant
app.listen(PORT, () => {
    console.log("Serveur OK")
})