import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_TIMELINE_KEY,
  authDomain: 'locking-timeline.firebaseapp.com',
  projectId: 'locking-timeline',
  storageBucket: 'locking-timeline.appspot.com',
  messagingSenderId: process.env.REACT_APP_MSG_SENDER,
  appId: process.env.REACT_APP_APP_ID,
};

// initialize app
firebase.initializeApp(firebaseConfig);

// initialize firestore
const projectFirestore = firebase.firestore();

// auth
const projectAuth = firebase.auth();

// storage
const projectStorage = firebase.storage();

//timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };
