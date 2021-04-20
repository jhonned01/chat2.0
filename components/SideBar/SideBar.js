import { Avatar, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../chat";

const SideBar = () => {
  const [user] = useAuthState(auth);

  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);

  const [chatsSnapShot] = useCollection(userChatRef);

  const handleCreateChat = () => {
    const input = prompt(
      "Please enter an email address for the user you wish to chat with"
    );
    if (!input) null;
    if (
      EmailValidator.validate(input) &&
      !chatAlReadyExists(input) &&
      input !== user.email
    ) {
      //we need to add chat into the DB "chasts" collection

      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlReadyExists = (recipientEmail) =>
    !!chatsSnapShot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user.email === recipientEmail)
          ?.length > 0
    );

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={() => auth.signOut()} />
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>
      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>
      <SideBottom onClick={handleCreateChat}>Start a new Chat</SideBottom>

      {chatsSnapShot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
};

export default SideBar;

const SideBottom = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 2px;
`;
const SearchInput = styled.input`
  outline-width: 0;
  flex: 1;
  border: none;
`;

const Container = styled.div``;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
