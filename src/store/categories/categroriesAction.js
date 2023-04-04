import {categoriesActionType} from "./categoriesActionType";

const setCategoriesMap = (categoriesMap) => {
    return {
        type: categoriesActionType.SET_CATEGORIES_MAP,
        payload: categoriesMap
    };
};

export {setCategoriesMap};
