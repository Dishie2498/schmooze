"use client";
import Sidebar from "@/components/Sidebar";
import styled from "styled-components";
import ChatScreen from "@/components/ChatScreen";
import { auth, db } from "../../../../firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";

export default function Chat(chat, messages) {
    const [user] = useAuthState(auth);

    const getChats = async (context) => {
      const ref = doc(db, `chats/${context.query.id}`);
  
    const messagesRef = collection(ref, "messages");
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const messagesRes = await getDocs(q)
  
    const messages = messagesRes.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      }
    }).map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }))
  
    const chatRes = await getDoc(ref);
    const chat = {
      ...chatRes.data(),
      id: chatRes.id,
    }
    }
    useEffect(() => {
        getChats();
    }, [])
    console.log("recipient email id:", chat["params"]["id"]); // recipient email id
    console.log("message:", messages); // chats
    return (
        <Container>
            <Head>
            <title>chat with {chat["params"]["id"]}</title>
            </Head>
            <Sidebar/>
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages}/>
            </ChatContainer>
        </Container>
    )
}

// Before the user goes to the page, we pre-fetch the required details
// This is called server-side rendering (Nextjs provides this)

// export async function getServerSideProps(context) {
//     console.log("");
// }

// async function getData() {
//     const res = collection(db, "chats").doc(context.query.id);
   
//     console.log("res:", res);
//   }

// export async function getServerSideProps() {
//   const context = await fetch(`https://...`)
//     const ref = doc(db, `chats/${context.query.id}`);
  
//     const messagesRef = collection(ref, "messages");
//     const q = query(messagesRef, orderBy("timestamp", "asc"));
//     const messagesRes = await getDocs(q)
  
//     const messages = messagesRes.docs.map((doc) => {
//       return {
//         ...doc.data(),
//         id: doc.id,
//       }
//     }).map(messages => ({
//       ...messages,
//       timestamp: messages.timestamp.toDate().getTime(),
//     }))
  
//     const chatRes = await getDoc(ref);
//     const chat = {
//       ...chatRes.data(),
//       id: chatRes.id,
//     }
  
//     return {
//       props: {
//         messages: JSON.stringify(messages),
//         chat,
//       }
//     }
//   }
  
const Container = styled.div`
display:flex;
`
const Head = styled.div``;

const ChatContainer = styled.div`
flex: 1;
overflow:  scroll;
height: 100vh;

::-webkit-scrollbar {
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;
`;