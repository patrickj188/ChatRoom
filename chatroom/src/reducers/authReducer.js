import * as TYPE from '../actions/types';

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  displayName: null,
  // userRooms: []
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case TYPE.SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        displayName: action.payload.displayName,
        // userRooms: action.payload.rooms
      };
    case TYPE.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        userId: null
      };
    default:
      return state;
  }
};
