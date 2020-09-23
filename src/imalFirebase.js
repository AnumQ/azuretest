import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDZRyjmRnSy5CNDg5di1FbhaT-YArBvjNo",
    authDomain: "imal-auth.firebaseapp.com",
    databaseURL: "https://imal-auth.firebaseio.com", 
    projectId: "imal-auth",
    storageBucket: "imal-auth.appspot.com",
    messagingSenderId: "735387542978",
    appId: "1:735387542978:web:1a669d29abd1284718a25b",
    measurementId: "G-Y7G4XTGEND"
  };

  
const imalFirebase = firebase.initializeApp(firebaseConfig);

export const db = imalFirebase.firestore();
export const auth = imalFirebase.auth();