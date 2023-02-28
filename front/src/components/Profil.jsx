import { useContext, Fragment } from "react"
import {BASE_URL} from '../tools/constante.js'
import {StoreContext} from "../tools/context.js"
import Login from "./Login.jsx"
import Modal from 'react-modal'
import ProfilUser from "./ProfilUser.jsx"
import ProfilAvis from "./ProfilAvis.jsx"
import ProfilCart from './ProfilCart.jsx'


Modal.setAppElement('#root');

const Profil = () => {
    const [state, dispatch] = useContext(StoreContext)

    return(
        <Fragment>
        <ProfilUser />
        <ProfilAvis />
        <ProfilCart />
         {state.user.isLogged === false && (
            <div>
                <p>Oups ! Page réservée aux membres</p>
                <p>Se connecter ou s'inscrire : </p>
                <Login />
            </div>
            )}
        </Fragment>
        )
}

export default Profil