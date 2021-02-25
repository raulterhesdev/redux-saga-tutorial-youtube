import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { firebaseConfig } from './firebase';

firebase.initializeApp(firebaseConfig);

var database = firebase.database();

export const registerUser = ({ email, password }) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => Promise.reject(error));
};

export const loginUser = ({ email, password }) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => Promise.reject(error));
};

export const logoutUser = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
    })
    .catch((error) => Promise.reject(error));
};
