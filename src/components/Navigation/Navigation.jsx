import {memo, useContext} from "react";
import { Outlet } from "react-router-dom";

import { ReactComponent as CrownLogo } from "../../assets/crown.svg";
import CartIcon from "../CartIcon";
import CartDropDown from "../CartDropDown/CartDropDown";

import { UserContext } from "../../store/contexts/user.context";
import { CartContext } from "../../store/contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import {
    NavigationContainer,
    NavLinks,
    NavLink,
    LogoContainer,
} from "./navigation.styles";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo className="logo" />
                </LogoContainer>

                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>

                    {currentUser ? (
                        <NavLink onClick={signOutUser}>SIGN OUT</NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}

                    <CartIcon />
                </NavLinks>

                {isCartOpen && <CartDropDown />}
            </NavigationContainer>

            <Outlet />
        </>
    );
};

export default memo(Navigation);
