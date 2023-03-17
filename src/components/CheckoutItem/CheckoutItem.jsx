import {useContext} from "react";

import {CartContext} from "../../store/contexts/cart.context";

import "./styles.scss";

const CheckoutItem = ({cardItem}) => {
    const {name, imageUrl, price, quantity} = cardItem;
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);

    const addItemHandler = () => addItemToCart(cardItem);
    const removeItemHandler = () => removeItemFromCart(cardItem);
    const clearItemHandler = () => clearItemFromCart(cardItem);

    return (
        <div className="checkout-item-container">
            <div className="image-container ">
                <img src={imageUrl} alt={name}/>
            </div>

            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={addItemHandler}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={removeItemHandler}>&#10095;</div>
            </span>
            <span className="price">{price * quantity}</span>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;
