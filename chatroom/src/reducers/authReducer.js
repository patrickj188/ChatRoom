import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INTIAL_STATE = {
    isSignedIn: null,
    userId: null,
    displayName: null,
};

export default (state = { INTIAL_STATE }, action) => {
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.userId, displayName: action.payload.displayName};
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null};
        default:
            return state;
    }

};
