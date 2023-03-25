import {createContext, useReducer} from "react";

import {createAction} from "../../utils/reducer/reducer.utils";

// Utils
const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cart) => cart.id === productToAdd.id
    );

    if (existingCartItem)
        return cartItems.map((cartItem) => {
            if (cartItem.id === productToAdd.id)
                return { ...cartItem, quantity: cartItem.quantity + 1 };
            else return cartItem;
        });

    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem.quantity === 1)
        return cartItems.filter(
            (cartItems) => cartItems.id !== cartItemToRemove.id
        );

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, cartItemToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
};

// Context structure
const CartContext = createContext({
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    setIsCartOpen: () => {},
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
});

// Cart Reducer
const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
}

const cartReduce = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            };
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
}

// Provider
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0
};

const CartProvider = ({ children }) => {
    // Reducer
    const [state, dispatch] = useReducer(cartReduce, INITIAL_STATE);
    const {isCartOpen, cartItems, cartCount, totalPrice} = state;

    // Dispatches
    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,
            0
        );
        const newTotalPrice = newCartItems.reduce(
            (totalPrice, cartItem) =>
                totalPrice + cartItem.price * cartItem.quantity,
            0
        );

        dispatch(
            createAction(
                CART_ACTION_TYPES.SET_CART_ITEMS,
                {
                    cartItems: newCartItems,
                    cartCount: newCartCount,
                    totalPrice: newTotalPrice
                }
            )
            /*{
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                cartCount: newCartCount,
                totalPrice: newTotalPrice
            }
        }*/)
    }

    const setIsCartOpen = (bool) => {
        dispatch({
            type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
            payload: bool
        });
    }

    // Functions
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToRemove) => {
        const newCartItems = clearCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    // Provider
    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        cartCount,
        totalPrice,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

export { CartContext, CartProvider };
