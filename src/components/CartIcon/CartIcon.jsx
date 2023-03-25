import {memo, useContext} from "react";

import {CartContext} from "../../store/contexts/cart.context";

import {CartIconContainer, ShoppingIcon, IconCount} from "./cart-icon.styles";

const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon className="shopping-icon"/>
            <IconCount className="item-count">{cartCount}</IconCount>
        </CartIconContainer>
    );
};

export default memo(CartIcon);
