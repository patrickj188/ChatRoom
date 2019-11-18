import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { signIn } from "../../actions";

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
const NotSignedIn = styled.div`
  width: 100%;
  display: block;
  padding-bottom: 50px;
   font-size: 30px;
   justify-content: center;
`;

class ChatRoom extends React.Component {

  componentDidMount () {

  }

  scrollToBottom () {
    const chatContainer = document.getElementById(chatScrollContainerId);
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }

  fetchData = (roomId, callback = () => {}) => {
    // db.getRoom(roomId).then(data => {
    //   if (data) {
    //     callback(data.messages);

    //   }
    // }).catch(err => {
    //   console.error(err);
    // })
  }

  onNewMessage = (message) => {
    // if (!message) return;
    // this.setState({ messages: this.state.messages.concat([message]) }, this.scrollToBottom);
  }

  onSubmit = (text) => {
    // db.writeToCollection("messages", this.state.currentMessage, this.props.displayName, Date.now()).then(result => {
    // }).catch(err => {
    //   console.error('whooops', err);
    // });
  }

  isMyMessage (message) {
    // return message.user === this.props.displayName;
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit(event.target.value.trim());
      return event.target.value = '';
    }
  }

  render () {
    const messages = this.props.room.messages || [];

    console.log("props.room", this.props.room)

    const renderText = () => {
      return messages.map((x, i) => {
        return <Text key={i} className={this.isMyMessage(x) ? 'my-message' : ''}>
          <span className="message-author">{x.user || 'Cactus John'}
          <button type="drop-down">...</button>
          </span>
          {x.text}
        </Text>;
      });
    }

    if (this.props.isSignedIn !== true) {
      return (<div>
        <ChatRoomWrapper>
          <NotSignedIn>Please Sign in</NotSignedIn>
        </ChatRoomWrapper>
      </div>);
    } else {
      return (
        <div>
          <ChatRoomWrapper className="chatroom-wrapper" style={{ height: `calc(100vh - ${this.props.navHeight} - ${this.props.footerHeight})` }}>
            <ChatRoomTextDiv id={chatScrollContainerId} className="chatroom-text">
              {renderText()}
            </ChatRoomTextDiv>
            <input placeholder="say something" onKeyUp={this.onKeyUp} />
          </ChatRoomWrapper>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    displayName: state.auth.displayName,
    currentRoomId: state.room.currentRoomId,
    room: state.room,
  };
};

export default connect(mapStateToProps, { signIn })(ChatRoom);
