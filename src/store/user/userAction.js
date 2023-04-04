import {userActionType} from "./userActionType";

const setCurrentUser = (user) => {
    return {
        type: userActionType.SET_CURRENT_USER,
        payload: user
    }
};

export {setCurrentUser};
