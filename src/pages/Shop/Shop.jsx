import {Route, Routes} from "react-router-dom";

import CategoriesPreview from "../CategoriesPreview";

import "./styles.scss";
import Category from "../Category";

const Shop = () => {
    return (
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
            <Route index element={<CategoriesPreview/>}/>
            <Route index element={<CategoriesPreview/>}/>
            <Route index element={<CategoriesPreview/>}/>
        </Routes>
    );
}

export default Shop;
