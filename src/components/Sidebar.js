"use client";
import {useEffect, useState} from 'react';
import { Avatar, IconButton, Button } from "@mui/material";
import styled from "styled-components";
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { auth, db } from "../../firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, onAuthStateChanged } from "firebase/auth";
import {useRouter} from "next/navigation";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from 'email-validator';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import Chat from '../components/Chat';
import { userAgent } from 'next/server';

export default function Sidebar() {
    const router = useRouter();

    const [user] = useAuthState(auth);

    const [userData, setUserData] = useState("");

    const fetchData = async () => {
        await getDocs(collection(db, "chats"), where("users", "array-contains", user))
        .then((querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
            setUserData(newData);
            return newData;
        })
    } 
    let chatSnapshot;
    useEffect(() => {
        chatSnapshot = fetchData();
    }, [])
   
    
    const signingOut= () => {
        signOut(auth);
        router.push("/login");
    }
    const createChat = () => {
        const input = prompt('Please enter the email address of your new contact');

        if(!input) return null;

        if(EmailValidator.validate(input) && user.email!=input) 
        {
            onAuthStateChanged(auth, (user) => {
                    const u_uid = user.uid;
    
                    setDoc(doc(db, 'chats', input), {
                        users: [user.email, input],
                        });
              });

        }

    }
    let recipientArray = [];
    // console.log(userData);
    for(let i=0; i<userData.length; i++)
    {
        recipientArray.push(userData[i]["id"]);
    }
    // console.log("recipientArray",recipientArray);

    return (
        <Container>
            {/* Part 1 - Topmost panel */}
            <Header>
                <UserAvatar onClick={signingOut}/>
                <IconsContainer>
                    <IconButton><ChatIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </IconsContainer>
            </Header>

            {/* Part 2 - Search bar */}
            <Search>
                <SearchIcon/>
                <SearchInput type="text" placeholder="Search in chats"/>
            </Search>

            {/* Part 3 - Button to start a new chat */}
            <SidebarButton onClick={createChat}>
                <AddCircleOutlineIcon className="text-sm"/> 
                Start a new chat
            </SidebarButton>

            {/* Part 4 - List of chats */}
            {recipientArray.map((email) => (
                // <p>{email}</p>
                <Chat key={email} email={email} sender={user} />
            ))}
        </Container>
    )
}
// npm install styled-components => Allows you to name your own components (just makes code look better nm)
const Container = styled.div`
`; 
// The topmost part of sidebar (contains 1. your dp, 2. chat icon, 3. three dots) -----------------------
const Header = styled.div` 
display : flex;
position: sticky; // Because we want the top chat icons to stick even if we scroll contacts below
top: 0;
background-color : beige;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
border-bottom: 1px solid white smoke;
`;


// For photos and stuff, material-ui is used
const UserAvatar = styled(Avatar)`
cursor: pointer;
:hover {
    opacity: 0.8;
}
`

const IconsContainer = styled.div``;

// Part 2: The search bar --------------------------------
const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 20px;
`;
const SearchInput = styled.input`
border: none;
outline-width: 0;
flex: 1;
`;

// Part 3: The sidebar button --------------------------------
const SidebarButton = styled(Button)`
color: black;
width: 100%;
&&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
}
background-color: pink;
`;


{/* {chatSnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    })
    } */}