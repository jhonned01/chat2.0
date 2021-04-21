import styled from "styled-components";

const Message = ({ user, message }) => {
  return (
    <Container>
      <p>{message.message}</p>
    </Container>
  );
};

export default Message;

export const Container = styled.div``;
