import React from 'react';
import styled from 'styled-components';
import db from '../../services/db.service'
import { connect } from 'react-redux';
import {signIn } from "../../actions";

const chatScrollContainerId = 'chat-scroll-container';

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  input {
    width: 90%;
    margin: 20px auto;
    padding: 10px;
    font-size: 1.2em;
  }
`;

const ChatRoomTextDiv = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow-y: scroll;
  padding-bottom: 50px;
`;

const Text = styled.p`
  width: 100%;
  text-align: left;
  padding: 10px 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  &.my-message {
    text-align: right;
  }

  span.message-author {
    opacity: 0.5;
    font-size: 0.8em;
  }
`;

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: '',
    }
  }

  async componentDidMount() {
    try {
      await this.fetchData();
      this.scrollToBottom();
      db.listenForMessages(this.onNewMessage)
    } catch (err) {
      console.log(err);
    }
    
  }

  scrollToBottom() {
    const chatContainer = document.getElementById(chatScrollContainerId);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }


  fetchData = () => {
    return new Promise((resolve, reject) => {
      db.readCollection("messages")
        .then(data => {
          this.setState({ messages: data }, () => resolve())
        })
        .catch(err => reject(err));
    })
  }
  
  onNewMessage = (message) => {
    if (!message) return;
    this.setState({ messages: this.state.messages.concat([message]) }, this.scrollToBottom)
  }

  onSubmit = () => {
    // write state message to db
    db.writeToCollection("messages", this.state.currentMessage, this.props.displayName, Date.now() ).then(result => {

    }).catch(err => {
      console.error('whooops', err)
    })
  }

  isMyMessage(message) {
    return message.user === this.props.displayName;
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit();
      return event.target.value = ''
    }
    this.setState({ currentMessage: event.target.value })
  }

  render()  {
    const renderText = this.state.messages.map((x, i) => {
      return <Text key={i} className={this.isMyMessage(x) ? 'my-message' : ''}>
        <span className="message-author">{x.user}</span>
        {x.message}
      </Text>
    })

    return (
      <div>
      <ChatRoomWrapper className="chatroom-wrapper" style={{ height: `calc(100vh - ${this.props.navHeight} - ${this.props.footerHeight})`}}>
        <ChatRoomTextDiv id={chatScrollContainerId} className="chatroom-text">
          {renderText}
        </ChatRoomTextDiv>

        <input placeholder="say something" onKeyUp={this.onKeyUp} />
      </ChatRoomWrapper>
      </div>
    )
  }
}

const mapStateToProps = (state) =>{
  return { userId: state.auth.userId, displayName: state.auth.displayName}
}

export default connect(mapStateToProps, {signIn})(ChatRoom);

