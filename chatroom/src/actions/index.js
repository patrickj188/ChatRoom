import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_ROOM,
} from './types';


export const signIn = (userId, displayName, isSignedIn, rooms) => {
  return {
    type: SIGN_IN,
    payload: {
      userId,
      displayName,
      isSignedIn,
      rooms
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createRoom = (room) => {
  return {
    type: CREATE_ROOM,
    payload: {
      room_id: room.room_id, 
      name: room.name,
    }
  }
}
