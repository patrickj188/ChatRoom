import {
    SIGN_IN,
    SIGN_OUT,
} from './types'


export const signIn = (userId, displayName, isSignedIn) => {
    return {
        type: SIGN_IN,
        payload: {
            userId,
            displayName,
            isSignedIn
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

