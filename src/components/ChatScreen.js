import { useAuthState } from "react-firebase-hooks/auth";
import { useState,useEffect } from "react";
import styled from "styled-components"
import { db, auth } from "../../firebase";
import { useRouter } from "next/navigation";
import { Avatar, Icon, IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection } from "react-firebase-hooks/firestore";
import { doc, setDoc, collection, query, where, getDocs, orderBy, onSnapshot, getDoc } from "firebase/firestore";
import { Message } from "@mui/icons-material";


export default function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);



    const fetchData = async (email) => {
        const querySnapshot = await getDocs(collection(db, "chats"), where("users", "array-contains", email));
        querySnapshot.forEach((doc) => {

            if(doc.id === email) {
                setChatData(doc.data()?.messages || []);
                console.log("chatData", doc.data().messages);
            }


        });
        
    } 

    
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

    useEffect(() => {
        const email = window.location.href.split("/chat/")[1];
        fetchData(email);
    }, [])


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