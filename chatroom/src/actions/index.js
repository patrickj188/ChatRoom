import {
    SIGN_IN,
    SIGN_OUT,
} from './types'


export const signIn = (userId, displayName) => {
    return {
        type: SIGN_IN,
        payload: {
            userId,
            displayName
        }
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

