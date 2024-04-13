import '../styles/globals.css';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase"
import Login from  "./login/page"
import Home from './page';

function MyApp({Component, pageProps}) {
    const [user] = useAuthState(auth);
    if(!user) return <Login />;

    return Home();
}

export default MyApp