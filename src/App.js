import React, { useState, useEffect } from 'react';
import './App.css';
import { auth, db } from "./imalFirebase";
import Login from './Components/Login/Login';
import Main from './Components/Main/Main';
import Spinner from './Components/Spinner/Spinner';
import SignUp from './Components/SignUp/SignUp';
import ErrorCard from './Components/Error/ErrorCard'
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  const [authUser, setAuthUser] = useState(auth.currentUser);
  const [userHasAccount, setHasAccount] = useState(true);
  const [error, setError] = useState('');
  
  const STATE = {
    LOGGED_IN : "LOGGED_IN",
    LOGGED_OUT : "LOGGED_OUT",
    LOADING : "LOADING",
    ERROR: "ERROR"
  }

  const [currentState, setCurrentState] = useState(STATE.LOADING);

  const authListener = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user);
        setCurrentState(STATE.LOGGED_IN);
      } else {
        setAuthUser(null)
        setCurrentState(STATE.LOGGED_OUT);
      }
    })
  };

  useEffect(() => {

    if (auth.isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt('Please provide your email for confirmation');
      }

      auth
      .signInWithEmailLink(email, window.location.href)
      .then(function(result) {
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        console.log("signed in with email link");

        console.log("user is ", result.user);
        db.collection('users').doc(result.user.uid).set({
          emailVerified: true
        }, { merge: true })
        .catch((err) => {
          console.log("Error updating user to firestore " + err);
        })


        authListener();
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error) {

        console.log("Error occured", error);
        setError(error.message);
        setCurrentState(STATE.ERROR);
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });

    } else {
      console.log("Auth listener called");
      authListener();
    }
    
  }, []);


  const DefaultMessage = <div className="text-center">Something went wrong. Try again.</div>

  const Routes = () => {
    return (
      <Router>
        <Route exact path="/">
          { !authUser ? <Redirect to="/login" /> : null }
        </Route>
      <Route path="/login">
          { userHasAccount ? <Login setHasAccount={setHasAccount}/> : <Redirect to="/signup" /> }
      </Route>
      <Route path="/signup">
          { userHasAccount ? <Redirect to="/login" /> : <SignUp setHasAccount={setHasAccount} /> }
        </Route>
    </Router>
    )
  }

  function renderComponent() {
    switch(currentState) {
      case STATE.LOADING: 
        return <Spinner />
      case STATE.LOGGED_IN: 
        return <Main authUser={authUser} />
      case STATE.LOGGED_OUT: 
        return <Routes />;
      case STATE.ERROR:
        return <ErrorCard msg={error} />
      default: 
        return <DefaultMessage />
    }
  }

  return (
    <div className="wrapper h-100 w-100">
      {/* { renderComponent() } */}
      <div className="">Test</div>
    </div>
  );
}

export default App;
