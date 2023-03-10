import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase";
import FormInput from "../FormInput";

import "./styles.scss";
import Button from "../Button";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const SignUpForm = () => {
    // State
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    // Functions
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Password checking
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        if (formFields.password.length < 8) {
            alert("password should contain at least 8 symbols");
            return;
        }

        // Registration
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if (error.code === "auth/email-already-in-use")
                alert("Cannot create user, email already in use");
            else
                console.log("user creation encountered an error", error);
        }
    };

    // Render
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>

            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name"
                           type="text"
                           required
                           name="displayName"
                           onChange={handleChange}
                           value={displayName}/>

                <FormInput label="Email"
                           type="email"
                           required
                           name="email"
                           onChange={handleChange}
                           value={email}/>

                <FormInput label="Password"
                           type="password"
                           required
                           name="password"
                           onChange={handleChange}
                           value={password}/>

                <FormInput label="Confirm Password"
                           type="password"
                           required
                           name="confirmPassword"
                           onChange={handleChange}
                           value={confirmPassword}/>

                <Button buttonType="" type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignUpForm;