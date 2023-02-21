import { BASE_URL } from "../tools/constante.js"

const Error404 = () => {
    return(
        <div>
            <p>Oups ! Désolée, page non trouvée ...</p>
            <img width= "50%" src={`${BASE_URL}/image/error.png`} alt="erreur 404" />
        </div>
        )
}

export default Error404