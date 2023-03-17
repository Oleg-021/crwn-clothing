import {useContext} from "react";

import CategoryPreview from "../../components/CategoryPreview";

import {CategoriesContext} from "../../store/contexts/categories.context";

import "./styles.scss";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    Object.keys(categoriesMap)

    return (
        <div className="shop-container">
            {Object.keys(categoriesMap).map(title => {
                const products = categoriesMap[title];
                return <CategoryPreview key={title} title={title} products={products}/>
            })}
        </div>
    );
}

export default CategoriesPreview;
