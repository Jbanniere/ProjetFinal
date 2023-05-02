import { BASE_URL } from "../tools/constante.js"

const Error404 = () => {
    return(
        <div className="error404">
            <p className="error-txt">Oups ! Désolée, page introuvable ...</p>
            <img src={`${BASE_URL}/image/error.png`} alt="erreur 404" />
        </div>
        )
}

export default Error404