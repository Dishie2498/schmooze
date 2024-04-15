import { useAuthState } from "react-firebase-hooks/auth";
import { useState,useEffect } from "react";
import styled from "styled-components"
import { db, auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { Avatar, Icon, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, query, where, getDocs, orderBy, onSnapshot } from "firebase/firestore";
import { Message } from "@mui/icons-material";


export default function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    
    console.log("messagesSnapshot" ,messagesSnapshot.docs );
    const [messagesSnapshot] = useCollection(collection(db, "chats").doc(router.query.id).collection('messages').orderBy('timestamp', 'ascending'));
    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                key = {message.id}
                user = {message.data().user}
                message = {{
                    ...message.data(),
                    timestamp: message.data().timestamp?.toDate().getTime(),
                }}
                />
            ))
    }}
    return (
        <Container>
            <Header>
                <Avatar/>
                <HeaderInfo>
                    <h3>{chat["params"]["id"]}</h3>
                    <p>Last seen ...</p>
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton><AttachFileIcon/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </HeaderIcons>
            </Header>
 
            <MessagesContainer>
                {/* shows msgs */}
                <EndOfMessage/>
            </MessagesContainer>
        </Container>
    )
}

const Container = styled.div`

`;

const Header = styled.div`
position: sticky;
background-color: white;
z-index: 100;
top: 0;
display: flex;
padding: 11px;
border-bottom: 1px solid whitesmoke;
`;

const HeaderInfo = styled.div`
margin-left: 15px;
flex: 1;

> h3 {
    margin-bottom: 3px;
}
> p {
    font-size: 14px;
    color: gray;
}
`;

const HeaderIcons = styled.div`

`;

const MessagesContainer = styled.div`

`;

const EndOfMessage = styled.div`

`;