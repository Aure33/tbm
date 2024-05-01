import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/authContext";
const SignIn = () => {
    const { googleSignIn } = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.error("Error signing in with Google", error);
        }
    };
    return (
        <div>
            <GoogleButton onClick={handleGoogleSignIn} />
        </div>
    );
};

export default SignIn;