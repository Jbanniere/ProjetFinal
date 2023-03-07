import { BASE_URL } from '../tools/constante.js'
import { Fragment } from "react"

const AvisPro = () => {
    return(
        <Fragment>
            <img className="child-img" width= "50%" src={`${BASE_URL}/image/mother.jpg`} alt="maman qui lit avec bébé" />
            
            <h2>L'avis du Pro</h2>
            <img className="pro-img" src={`${BASE_URL}/image/docteur.jpg`} alt="médecin" />
            <p>
            "Ce magazine pour les tout petits est un véritable atout pour leur développement 
            et leur éveil. Les histoires amusantes et les images adaptées à leur 
            âge stimulent leur créativité et leur curiosité, tout en leur offrant une approche sur le monde 
            qui les entoure. De plus, les activités ludiques proposées permettent de développer les capacités 
            sensorielles et intellectuelles des enfants. Grâce à la dimension de partage en famille, les parents 
            peuvent également s'impliquer dans le développement de leur enfant et renforcer les liens familiaux. 
            Je recommande donc fortement ce magazine pour les tout petits."
            </p>
        </Fragment>
        )
}

export default AvisPro