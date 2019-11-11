import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import db from '../../services/db.service';
import { createRoom } from '../../actions';

const SideContainer = styled.div`
  width: 70px;
  height: 100vh;
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
`;

const SideBar = (props) => {
  const renderRoomNames = props.rooms.map(x => {
    return <li key={x.room_id}>{x.name}</li>
  })

  return (
    <SideContainer>
      <button onClick={async () => {
        const room = await db.createRoom('Test Room', props);
        props.createRoom(room.data())
      }}>
        Create Room
      </button>
      <ul>
        {renderRoomNames}
      </ul>
    </SideContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    displayName:state.auth.displayName,
    isSignedIn: state.auth.isSignedIn,
    rooms: state.auth.rooms,
  };
};

export default connect(mapStateToProps, { createRoom })(SideBar);
