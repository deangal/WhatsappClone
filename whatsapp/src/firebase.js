import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCW2VqsQRfsaPq4SuZnMXJHw39ya_Ts5dc",
    authDomain: "whatsappclone-43313.firebaseapp.com",
    projectId: "whatsappclone-43313",
    storageBucket: "whatsappclone-43313.appspot.com",
    messagingSenderId: "625799596727",
    appId: "1:625799596727:web:4523d4d5bdaa2ece15db32",
    measurementId: "G-NNXEEQM905"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;