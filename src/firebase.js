/******** firebase web version under 9  *********/

import firebase from 'firebase/app';
import "firebase/database";


/* process of firebase import */
const firebaseConfig = {
    apiKey: "AIzaSyD98lKj-GKZmHcAmg6JFNn1nnsT9XozXOA",
    authDomain: "react-contact-a520b.firebaseapp.com",
    projectId: "react-contact-a520b",
    storageBucket: "react-contact-a520b.appspot.com",
    messagingSenderId: "7506050346",
    appId: "1:7506050346:web:5fc3b96cd21870d04f3253"
  };


const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();

/*  ref() - represents a specific location in your Database
            and can be used for reading or writing data to that 
            Database location. 
      You can reference the 'root' or 'child' location in your Database 
      by calling firebase.database().ref() ...   */