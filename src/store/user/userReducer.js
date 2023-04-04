import {userActionType} from "./userActionType";

const initialState = {
    currentUser: null
}

const userReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case userActionType.SET_CURRENT_USER:
            return {currentUser: payload}
        default:
            return state;
    }
};

export {userReducer};
