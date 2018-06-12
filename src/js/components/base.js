import firebase from "firebase/app";
import "firebase/database";
let Rebase = require("re-base");
var app = firebase.initializeApp({
  apiKey: "xxxxx",
  authDomain: "events-meraki-f3671.firebaseapp.com",
  databaseURL: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxx",
  messagingSenderId: "xxxxxx"
});
let db = firebase.database(app);
export const base = Rebase.createClass(db);

export { app };
export default base;
