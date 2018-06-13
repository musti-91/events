import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
let Rebase = require("re-base");
var app = firebase.initializeApp({
  apiKey: "AIzaSyAlQSiXryvrsj86yEObuUfWY5TGXVqtouw",
  authDomain: "events-meraki-f3671.firebaseapp.com",
  databaseURL: "https://events-meraki-f3671.firebaseio.com",
  projectId: "events-meraki-f3671",
  storageBucket: "events-meraki-f3671.appspot.com",
  messagingSenderId: "49386294021"
});
let db = firebase.database(app);
const base = Rebase.createClass(db);
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/login",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
};
export { app, uiConfig };
export default base;
