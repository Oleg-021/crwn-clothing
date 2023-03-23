import {memo} from "react";

import {BUTTON_TYPES_CLASSES} from "../../constants";

import {BaseButton, GoogleSignInButton, InvertedButton,} from "./button.styles.jsx";

const getButton = (buttonType = BUTTON_TYPES_CLASSES.base) => {
    return {
        [BUTTON_TYPES_CLASSES.base]: BaseButton,
        [BUTTON_TYPES_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPES_CLASSES.inverted]: InvertedButton,
    }[buttonType];
};

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default memo(Button);
