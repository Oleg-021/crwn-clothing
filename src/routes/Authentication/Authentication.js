import SignUpForm from "../../components/SIgnUpForm";
import SignInForm from "../../components/SIgnInForm";

import "./styles.scss";

const Authentication = () => {
    return (
        <div className="authentication">
            <SignInForm/>
            <SignUpForm/>
        </div>
    );
}

export default Authentication;
