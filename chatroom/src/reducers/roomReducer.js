import * as TYPE from '../actions/types';

const INITIAL_STATE = {
  allUserRooms: [],
  currentRoomId: null,
  currentRoomName: '',
  messages: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TYPE.SIGN_IN:
      const { rooms } = action.payload;
      return {
        ...state,
        allUserRooms: rooms,
        currentRoomId: rooms[0] ? rooms[0].room_id : null,
        currentRoomName: rooms[0] ? rooms[0].name : '',
      }
    case TYPE.CREATE_ROOM:
      const { name, id } = action.payload;
      const newRoom = { name, id }
      return {
        ...state,
        allUserRooms: state.allUserRooms.concat([newRoom]),
      }
    case TYPE.GO_TO_ROOM:
      const { room, messages } = action.payload;
      return {
        ...state,
        currentRoomId: room.room_id,
        currentRoomName: room.name,
        messages: messages
      }
    default:
      return {
        ...state
      }
  }
};
