import {useContext} from "react";

import Button from "../Button";
import {BUTTON_TYPES_CLASSES} from "../../constants";
import {CartContext} from "../../store/contexts/cart.context";

import "./styles.scss";

const ProductCard = ({product}) => {
    const {name, price, imageUrl} = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product)

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name}/>
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>

            <Button buttonType={BUTTON_TYPES_CLASSES.inverted} onClick={addProductToCart}>Add to card</Button>
        </div>
    );
}

export default ProductCard;
