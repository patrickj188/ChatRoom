import * as TYPE from './types';

export const signIn = (userId, displayName, isSignedIn, rooms) => {
  return {
    type: TYPE.SIGN_IN,
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
    type: TYPE.SIGN_OUT
  };
};

export const createRoom = (name, id) => {
  return {
    type: TYPE.CREATE_ROOM,
    payload: {
      name,
      id,
    }
  }
}

export const goToRoom = (roomId) => {
  return async (dispatch, getState, { db }) => {
    const { room, messages } = await db.getRoom(roomId);
    dispatch({
      type: TYPE.GO_TO_ROOM,
      payload: {
        room,
        messages 
      }
    })
  }
}
