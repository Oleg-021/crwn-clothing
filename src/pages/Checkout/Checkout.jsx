import {useContext} from "react";

import CheckoutItem from "../../components/CheckoutItem";

import {CartContext} from "../../store/contexts/cart";

import "./styles.scss";

const Checkout = () => {
    const {cartItems, totalPrice} = useContext(CartContext);

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <div>Remove</div>
                </div>
            </div>

            {cartItems.map(cartItem => <CheckoutItem key={cartItems.id} cardItem={cartItem}/>)}

            <span className="total">Total: {totalPrice}</span>
        </div>
    );
}

export default Checkout;
