import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_ROOM,
} from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  displayName: null,
  rooms: [],
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state, isSignedIn: true,
        userId: action.payload.userId,
        displayName: action.payload.displayName,
        rooms: action.payload.rooms
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null
      };
    case CREATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.concat([action.payload])
      };
    default:
      return state;
  }

};
