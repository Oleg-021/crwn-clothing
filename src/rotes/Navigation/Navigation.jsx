import {Outlet, Link} from "react-router-dom";

import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";
import {useContext} from "react";
import {UserContext} from "../../store/contexts/user";
import {signOutUser} from "../../utils/firebase/firebase";

import "./styles.scss";
import CartIcon from "../../components/CartIcon";
import CartDropDown from "../../components/CartDropDown/CartDropDown";

const Navigation = () => {
    const {currentUser} = useContext(UserContext);

    console.log(currentUser);

    return <>
        <div className="navigation">
            <Link className="logo-container" to="/">
                <CrwnLogo className="logo"/>
            </Link>

            <div className="nav-links-container">
                <Link className="nav-link" to="/shop">SHOP</Link>
                {
                    currentUser ?
                        <span className="nav-link" onClick={signOutUser}>SIGN OUT</span> :
                        <Link className="nav-link" to="/auth">SIGN IN</Link>
                }
                <CartIcon/>
            </div>
            <CartDropDown/>
        </div>

        <Outlet/>
    </>;
}

export default Navigation;
