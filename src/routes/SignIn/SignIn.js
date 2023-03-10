import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase"
import SignUpForm from "../../components/SIgnUpForm";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response.user);
    }

    return (
        <div>
            <h1>Sign in Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>

            <SignUpForm />
        </div>
    );
}

export default SignIn;
