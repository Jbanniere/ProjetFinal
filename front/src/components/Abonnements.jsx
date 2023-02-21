import { BASE_URL } from '../tools/constante.js'
import { Fragment } from "react"

const Abonnements = () => {
    return(
        <Fragment>
            <h2>Rejoignez la tribu !</h2>
            <table>
                <thead>
                    <tr>
                        <th>Mensuel seul</th>
                        <th>Mensuel + Hors Séries</th>
                    </tr>
                </thead>
                <tbody>
                  <tr>
                  	<td>
                  	    <img width="30%" src={`${BASE_URL}/image/mensuelpiou.png`} alt="mensuel + hors série" />
                  	</td>
                    <td>
                  	    <img width="30%" src={`${BASE_URL}/image/pioupiou_hs.png`} alt="mensuel + hors série" />
                  	</td>
                  </tr>
                  <tr>
                  	<td colSpan="2">1 mensuel / mois</td>
                  </tr>
                  <tr>
                  	<td colSpan="2">Sans engagement de durée</td>
                  </tr>
                  <tr>
                  	<td>/</td>
                    <td>4 Hors Séries par an</td>
                 </tr>
                 <tr>
                    <td>
                        <button className="product-qte">-</button>
                        <strong id="quantite" >0</strong>
                        <button className="btn-product-qte">+</button>
                        <button>S'abonner</button>
                    </td>
                    <td>
                        <button className="product-qte">-</button>
                        <strong id="quantite" >0</strong>
                        <button className="btn-product-qte">+</button>
                        <button>S'abonner</button>
                    </td>
                 </tr>
                </tbody>
            </table>
        </Fragment>
        )
}

export default Abonnements