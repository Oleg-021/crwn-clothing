import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";
import CartItem from "../CartItem/CartItem";

import { CartContext } from "../../store/contexts/cart.context";

import "./styles.scss";

const CartDropDown = () => {
    const { setIsCartOpen, cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout");
        setIsCartOpen(false);
    };

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropDown;
