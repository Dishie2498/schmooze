"use client";
import styled from "styled-components";
import Head from "next/head";
import { Button } from "@mui/material"
import { auth, provider, db } from "../../../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import {useRouter} from "next/navigation";
import { doc, setDoc } from "firebase/firestore"; 


export default function Login() {
    const router = useRouter();


    const signIn = () => {
        // signInWithPopup(auth, provider).catch(alert);
        const userCred = signInWithPopup(auth, new GoogleAuthProvider());

        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/");
                const u_uid = user.uid;

                setDoc(doc(db, 'users', u_uid), {
                    email: user.email,
                    lastSeen: user.metadata.lastSignInTime,
                    photoURL: user.photoURL,
                    }, {merge: true});
            } else {
                router.push("/login");
            }
          });

    }
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                <Logo src="https://www.freeiconspng.com/thumbs/pink-message-icon/pink-message-icon-11.png"></Logo>
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

const Container = styled.div`
display: grid;
height: 100vh;
place-items: center;
background-color: whitesmoke;
`;

const LoginContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 100px;
background-color: white;
border-radius: 5px;
box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.img`
height: 100px;
width: 100px;
margin-bottom: 50px;
`;