import { useContext, Fragment } from "react"
import { StoreContext } from "../tools/context.js"
import Login from "./Login.jsx"
import Modal from 'react-modal'
import ProfilUser from "./ProfilUser.jsx"
import ProfilAvis from "./ProfilAvis.jsx"
import ProfilCart from './ProfilCart.jsx'
import PanelAdmin from './PanelAdmin'


Modal.setAppElement('#root');

const Profil = () => {
    const [state, dispatch] = useContext(StoreContext)

    return(
        <Fragment>
        <div className="container ">
            <ProfilUser />
            {state.user.isAdmin === false && (
            <Fragment>
                <ProfilAvis />
                <ProfilCart />
            </Fragment>
            )}
            {state.user.isAdmin && (
                <PanelAdmin />
            )}
            {state.user.isLogged === false && (
                <div>
                    <div className="error-txt">
                        <p><span className="strong-font">Oups !</span> Page réservée aux membres</p>
                        <p>Pour vous connecter ou vous inscrire : </p>
                    </div>
                    <Login />
                </div>
                )}
        </div>
        </Fragment>
        )
}

export default Profil