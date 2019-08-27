import React from 'react';
import { connect } from 'react-redux';
import {signIn, signOut } from "../actions";
import { firebase, database, googleAuthProvider as provider } from '../firebase';


class GoogleAuth extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    }

    onAuthChange = (user) => {
        if (user) {
            this.props.signIn(user.uid);
        } else {
            this.props.signOut();
        };
    }

    onSignInClick = () => {
        provider.addScope('profile')
        provider.addScope('email')
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async result => {
                this.readTestData();
            })
            .catch(err => {
                console.error('sign in error', err);
            })
    }

    readTestData = () => {
        firebase.firestore().collection('test').get()
            .then(snapshot => {
                const values =  snapshot.docs.map(doc => doc.data());
                console.log(values)
            })
    }

    onSignOutClick = () => {
        firebase.auth().signOut();
        this.props.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                <i className="google icon" />
                Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                <i className="google icon" />
                Sign In with Google
                </button>
            )
        }
    }

    render() {
        return (
            <div>
               {this.renderAuthButton()}
            </div>
        )
    }

};

const mapStateToProps = (state) =>{
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
