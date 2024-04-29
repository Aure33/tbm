import { UserAuth } from "../context/authContext";
import SignIn from "./signIn";
import { useSelector } from 'react-redux';

const NavBar = () => {
    const { logOut } = UserAuth();
    const user = useSelector(state => state.currentUser);
    const handleSignOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.error("Error signing out", error);
        }
    }

    return (
        <div>
            {user?.name ? (
                <>                
                <img src={user.photoProfil} alt="photoProfil" style={{ width: 50, height: 50, verticalAlign: "middle", padding: 10 }} />
                <button onClick={handleSignOut}>Logout</button>
                </>
            ) : (
                <SignIn />
            )}
        </div>
    );
}

export default NavBar;