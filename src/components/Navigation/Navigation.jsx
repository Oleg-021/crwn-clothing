import {memo, useContext} from "react";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";

import {ReactComponent as CrownLogo} from "../../assets/crown.svg";
import CartIcon from "../CartIcon";
import CartDropDown from "../CartDropDown/CartDropDown";
import {CartContext} from "../../store/contexts/cart.context";
import {signOutUser} from "../../utils/firebase/firebase.utils";
import {selectCurrentUser} from "../../store/user/userSelector";

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const {isCartOpen} = useContext(CartContext);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo"/>
                </LogoContainer>

                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>

                    {currentUser ? (
                        <NavLink onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}

                    <CartIcon/>
                </NavLinks>

                {isCartOpen && <CartDropDown/>}
            </NavigationContainer>

            <Outlet/>
        </>
    );
};

export default memo(Navigation);
