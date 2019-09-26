import React from 'react';
import styled from 'styled-components';
import db from '../../services/db.service'
import { connect } from 'react-redux';
import {signIn } from "../../actions";

const ChatRoomTextDiv = styled.div`
border: 1px solid black;
width: 30%;
height: 300px;
margin: 0 auto;
margin-bottom: 10px;
overflow: scroll;
`;

const ChatRoomWrapper = styled.div`
width: 100%;
height: 60%;
display: block;
justify-content: center;
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
    const renderTest = this.state.messages.map((x, i) => {
      return <p key={i}>{x.message} | {x.user}</p>
    })

    return (
      <div>
      <ChatRoomWrapper>
        <ChatRoomTextDiv>
          {renderTest}
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

