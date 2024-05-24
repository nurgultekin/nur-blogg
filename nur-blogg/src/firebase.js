import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDRwD-OmWUQ7jsgX1AZ9vxi0NVfkFAu3gs",
    authDomain: "nur-s-blogg.firebaseapp.com",
    projectId: "nur-s-blogg",
    storageBucket: "nur-s-blogg.appspot.com",
    messagingSenderId: "567736859523",
    appId: "1:567736859523:web:f275f49dfab3740aa454b6"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export default app;
