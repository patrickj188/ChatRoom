import React from 'react';
import styled from 'styled-components';
import db from '../../services/db.service'
import { connect } from 'react-redux';
import {signIn } from "../../actions";

const ChatRoomTextDiv = styled.div`
  width: 100%;
  height: 700px;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: scroll;
  /* padding: 0 50px; */
`;

const ChatRoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  width: 100%;

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
    this.fetchData();
    db.listenForMessages(this.onNewMessage)
  }


  fetchData = () => {
    db.readCollection("messages")
      .then(data => {
        this.setState({ messages: data })
      })
      .catch(err => console.error(err))
  }
  
  onNewMessage = (message) => {
    if (!message) return;
    this.setState({ messages: this.state.messages.concat([message]) })
  }

  onSubmit = () => {
    // write state message to db
    db.writeToCollection("messages", this.state.currentMessage, this.props.displayName, Date.now() ).then(result => {

    }).catch(err => {
      console.error('whooops', err)
    })
  }

  onKeyUp = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit();
      return event.target.value = ''
    }
    this.setState({ currentMessage: event.target.value })
  }

  render() {
    const renderText = this.state.messages.map((x, i) => {
      return <Text key={i}>{x.message} <span className="message-author">{x.user}</span></Text>
    })

    return (
      <div>
      <ChatRoomWrapper className="chatroom-wrapper">
        <ChatRoomTextDiv className="chatroom-text">
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

