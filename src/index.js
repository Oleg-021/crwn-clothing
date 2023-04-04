import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";

import App from "./App";
import {CategoriesProvider} from "./store/contexts/categories.context";
import {CartProvider} from "./store/contexts/cart.context";
import {store} from "./store/store";

import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CategoriesProvider>
                <CartProvider>
                    <App/>
                </CartProvider>
            </CategoriesProvider>
        </BrowserRouter>
    </Provider>
);

reportWebVitals();
