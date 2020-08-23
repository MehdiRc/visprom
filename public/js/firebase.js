const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


const firebaseConfig = {
  apiKey: "AIzaSyBnRkS_j8EvQS5KuYY9kj7iNJEziuM47qA",
  authDomain: "vispromtestdb.firebaseapp.com",
  databaseURL: "https://vispromtestdb.firebaseio.com",
  projectId: "vispromtestdb",
  storageBucket: "vispromtestdb.appspot.com",
  messagingSenderId: "882315027825",
  appId: "1:882315027825:web:f15f794084050518ea42d0"
};


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //me
  const db = firebase.firestore()
module.exports = {
  db: db
}  