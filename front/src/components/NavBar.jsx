import { NavLink } from "react-router-dom";

const NavBar = (props) => {
    return(
        <nav>
            <ul>
                <li>
                    <NavLink to="/form">
                        Formulaire
                    </NavLink>
                    <NavLink to="/contact">
                        Liste de contacts
                    </NavLink>
                </li>
            </ul>
        </nav>
        )
}

export default NavBar