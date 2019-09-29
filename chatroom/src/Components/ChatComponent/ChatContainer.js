import React from 'react';
import styled from 'styled-components';
import ChatRoom from './ChatRoom';

const ChatContainer = () => {

const ChatDiv = styled.div`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    `;

return (
<ChatDiv>
    <ChatRoom></ChatRoom>
</ChatDiv>
)
};

export default ChatContainer;
