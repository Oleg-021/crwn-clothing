import {categoriesActionType} from "./categoriesActionType";

const initialState = {
    categoriesMap: {}
}

const categoriesReducer = (state = initialState, action = {}) => {
    const {type, payload} = action;

    switch (type) {
        case categoriesActionType.SET_CATEGORIES_MAP:
            return {...state, categoriesMap: payload};
        default:
            return state;
    }
}

export {categoriesReducer};
