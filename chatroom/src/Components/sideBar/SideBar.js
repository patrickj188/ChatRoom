
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import db from '../../services/db.service';
import { createRoom, goToRoom } from '../../actions';

const SideContainer = styled.div`
  width: 10vw;
  height: 100vh;
  border: 1px solid black;
  position: absolute;
  top: 0;
  left: 0;
`;

const RoomIcon = styled.button`
  width: 8vw;
  height: 12vh;
  background-color: salmon;
  position: absolute;
  margin: 5px;
  text-align: center;
  border-radius: 15%;
  top: 10%;
`;

const SideBar = (props) => {
  const renderRoomNames = props.rooms.map(x => {
    return <li key={x.room_id} onClick={() => props.goToRoom(x.room_id)}>{x.name}</li>
  })

  return (
    <SideContainer>
      <button onClick={async () => {
        const room = await db.createRoom('Test Room', props);
        props.createRoom(room.data())
      }}>
        Create Room
      </button>
      <RoomIcon>
        {renderRoomNames}
      </RoomIcon>
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

export default connect(mapStateToProps, { createRoom, goToRoom })(SideBar);



