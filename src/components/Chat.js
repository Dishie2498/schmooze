"use client"
import { Avatar } from "@mui/material";
import {useEffect, useState} from 'react';
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Chat({ email, sender }) {

    // const [userDP, setUserDP] = useState(email[0]);

    // const fetchData = async () => {
    //     await getDocs(collection(db, "users"), where("email", "==", email))
    //     .then((querySnapshot) => {
    //         const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}));
    //         setUserDP(newData);
    //     })
    // } 
    // useEffect(() => {
    //     fetchData();
    // }, [])
    // console.log(userDP);
    // const recipientDP = userDP[0]["photoURL"];

    const router = useRouter();
    const enterChat = () => {
        router.push(`/chat/${email}`);
    }
    return ( 
    <Container onClick={enterChat}>
        {/* {recipientDP ? (
            <UserAvatar src={recipientDP}/>
        ) : (
            <UserAvatar>{email[0]}</UserAvatar>
        )} */}
        <UserAvatar>{email[0]}</UserAvatar>
        <p>{email}</p>
    </Container>
    )
}

const Container = styled.div`
display:flex;
align-items: center;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover {
    background-color: #e9eaeb;
}
`;

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`;