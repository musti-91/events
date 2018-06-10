let Rebase = require("re-base");
let firebase = require("firebase");
var app = firebase.initializeApp({});
let db = firebase.database(app);
export const base = Rebase.createClass(db);

export { app };
export default base;
