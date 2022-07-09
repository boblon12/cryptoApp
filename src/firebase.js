import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export const auth = firebase
  .initializeApp({
    apiKey: 'AIzaSyDSqDmd7-tqMMii0OYfFjQ86DpC3pHw84c',
    authDomain: 'givemecrypto-bbc4a.firebaseapp.com',
    projectId: 'givemecrypto-bbc4a',
    storageBucket: 'givemecrypto-bbc4a.appspot.com',
    messagingSenderId: '378074189599',
    appId: '1:378074189599:web:4b25155974b7a08f4aea2a',
  })
  .auth();
