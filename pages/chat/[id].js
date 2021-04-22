import styled from "styled-components";
import Head from "next/head";
import SideBar from "../../components/SideBar/SideBar";
import ChatScreen from "../../components/ChatScreen";
import { db, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";

const Chat = ({ chat, mensages }) => {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <SideBar />

      <ChatContainer>
        <ChatScreen chat={chat} mensages={mensages} />
      </ChatContainer>
    </Container>
  );
};

export default Chat;

export async function getServerSideProps({ query }) {
  const ref = db.collection("chats").doc(query.id);

  //PREP the mensages on the server
  const messengesRess = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messengesRess.docs
    .map((msg) => ({
      id: msg.id,
      ...msg.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //prep the chats messages

  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  return {
    props: { mensages: JSON.stringify(messages), chat: chat },
  };
}

const Container = styled.div`
  display: flex;
`;
const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
`;
