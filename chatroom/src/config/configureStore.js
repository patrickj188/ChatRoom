import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import { firebase, googleAuthProvider } from './firebase';
import db from '../services/db.service';

const composeEnhancers = composeWithDevTools({});

export default function configureStore (initialState) {
  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ db, firebase, googleAuthProvider }))
    )
  );
}
