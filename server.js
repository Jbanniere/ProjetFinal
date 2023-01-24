import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import router from "./routes/routes.js"


const app = express()
const PORT = 3001

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use(express.static("public"));

app.use("/", router)

app.listen(PORT, () => {
    console.log("Serveur OK")
})