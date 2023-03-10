import {useState} from "react";

import {
    createUserDocumentFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase";
import FormInput from "../FormInput";
import Button from "../Button";

import "./styles.scss";

const defaultFormFields = {
    email: "",
    password: ""
}

const SignInForm = () => {
    // State
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    // Functions
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (formFields.password.length < 8) {
            alert("password should contain at least 8 symbols");
            return;
        }

        try {
            await signInUserWithEmailAndPassword(email, password);

            resetFormFields()
        } catch (error) {
            switch (error.code) {
                case "auth/wrong-password":
                    alert("incorrect password for email");
                    break;
                case "auth/user-not-found":
                    alert("no user assosiated with this email");
                    break;
                default:
                    console.log(error);
            }
        }
    };

    return (
        <div className="sign-in-container">
            <h2>I already have an account</h2>

            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
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

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>
                    <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;
