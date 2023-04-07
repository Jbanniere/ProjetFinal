import { BASE_URL } from '../tools/constante.js'
import { Fragment } from "react"

const AvisPro = () => {
    return(
        <Fragment>
            <div className="avis__pro">
                <img className="child-img" src={`${BASE_URL}/image/mother.jpg`} alt="maman qui lit avec bébé" />
                <img className="child-img desktop" src={`${BASE_URL}/image/father-read.png`} alt="papa qui lit avec bébé" />
            </div>
            <h2 className="h2-perso">L'avis du Pro</h2>
            <div className="avis-pro flex align-center direction-column">
                <img className="pro-img" src={`${BASE_URL}/image/docteur.jpg`} alt="médecin" />
                <p className="pro-name">Raoul Hito, <span>pedopsychiatre</span></p>
                <div className="flex justify-center">
                    <img className="ellipse-pro" src={`${BASE_URL}/image/ellipse-pro.png`} alt="ellipse" />
                    <p className="txt-avis-pro">
                    "Ce magazine pour les tout petits est un véritable atout pour leur développement 
                    et leur éveil. Les histoires amusantes et les images adaptées à leur 
                    âge stimulent leur créativité et leur curiosité, tout en leur offrant une approche sur le monde 
                    qui les entoure. De plus, les activités ludiques proposées permettent de développer les capacités 
                    sensorielles et intellectuelles des enfants. Grâce à la dimension de partage en famille, les parents 
                    peuvent également s'impliquer dans le développement de leur enfant et renforcer les liens familiaux. 
                    Je recommande donc fortement ce magazine pour les tout petits."
                    </p>
                </div>
                
            </div>
        </Fragment>
        )
}

export default AvisPro