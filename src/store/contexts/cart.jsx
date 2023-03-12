import {createContext, useEffect, useState} from "react";

// Utils
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(cart => cart.id === productToAdd.id);

    if (existingCartItem)
        return cartItems.map(cartItem => {
            if (cartItem.id === productToAdd.id)
                return {...cartItem, quantity: cartItem.quantity + 1};
            else
                return cartItem;
        });

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1)
        return cartItems.filter(cartItems => cartItems.id !== cartItemToRemove.id);

    return cartItems.map(cartItem => cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1} :
        cartItem);
}

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
}

// Context structure
const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    setIsCartOpen: () => {
    },
    addItemToCart: () => {
    },
    removeItemFromCart: () => {
    },
    clearItemFromCart: () => {
    }
});

// Provider
const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);


    const addItemToCart = (productToAdd) => setCartItems(addCartItem(cartItems, productToAdd));
    const removeItemFromCart = (cartItemToRemove) => setCartItems(removeCartItem(cartItems, cartItemToRemove));
    const clearItemFromCart = (cartItemToRemove) => setCartItems(clearCartItem(cartItems, cartItemToRemove));

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newTotalPrice = cartItems.reduce((totalPrice, cartItem) => totalPrice + cartItem.price * cartItem.quantity, 0);
        setCartCount(newCartCount);
        setTotalPrice(newTotalPrice);
    }, [cartItems])

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartCount,
        totalPrice,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

export {CartContext, CartProvider};
