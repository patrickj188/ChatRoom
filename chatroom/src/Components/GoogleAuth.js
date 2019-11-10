import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from "../actions";
import { firebase, googleAuthProvider as provider } from '../firebase';
import db from '../services/db.service';

class GoogleAuth extends React.Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(this.onAuthChange);
    }

    onAuthChange = (user) => {
        if (user) {
            db.getUser(user.uid).then(data => {
                console.log(data)
                this.props.signIn(user.uid, user.displayName, true, data.rooms);
            })
        } else {
            this.props.signOut();
        };
    }

    onSignInClick = () => {
        provider.addScope('profile');
        provider.addScope('email');
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(async result => {
                this.setState({ displayName: result.user.displayName });
                db.loginUser(result.user)

            })
            .catch(err => {
                console.error('sign in error', err);
            });
    }

    onSignOutClick = () => {
        firebase.auth().signOut();
        this.props.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui blue google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }

};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
