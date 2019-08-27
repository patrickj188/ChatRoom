import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

const ChatContainer = () => {

const ChatDiv = styled.div`
    width: 100%;
    height: 60vh;
    margin: 0 auto;
    text-align: center;
    padding-top: 10px;
    `;

return (
<ChatDiv>
    <ChatRoom></ChatRoom>
</ChatDiv>
)
};

export default ChatContainer;
