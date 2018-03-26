import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyANtYYDG_SG-oITfRitkRx3kfoyV7_6X0c",
    authDomain: "chat-app-7043e.firebaseapp.com",
    databaseURL: "https://chat-app-7043e.firebaseio.com",
    projectId: "chat-app-7043e",
    storageBucket: "chat-app-7043e.appspot.com",
    messagingSenderId: "505776270058",
    provider: "anonymous",
    uid: "1d3aa6b0-edea-49d7-89cb-e2c5e8236946"
  };

  export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();