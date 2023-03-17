import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import CartItem from "../CartItem/CartItem";

import { CartContext } from "../../store/contexts/cart.context";

import {
    CartDropDownContainer,
    EmptyMessage,
    CartItems,
} from "./cart-dropdown.styles";

const CartDropDown = () => {
    const { setIsCartOpen, cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        setIsCartOpen(false);
    };

    return (
        <CartDropDownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item} />
                    ))
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropDownContainer>
    );
};

export default CartDropDown;
