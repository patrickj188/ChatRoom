
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const allUserRooms = useSelector(state => state.room.allUserRooms) || [];
  const renderRoomNames = allUserRooms.map(x => {
    return (
      <li key={x.room_id} onClick={() => dispatch(goToRoom(x.room_id))}>
        {x.name}
      </li>
    )
  })

  return (
    <SideContainer>
      <button onClick={async () => {
        dispatch(createRoom({ name: 'New Room' }))
      }}>
        Create Room
      </button>
      <RoomIcon>
        {renderRoomNames}
      </RoomIcon>
    </SideContainer>
  )
}

export default SideBar;
