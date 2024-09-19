// Import the Firebase libraries
import firebase from 'firebase/app';
import 'firebase/firestore'; // Firestore for database
import 'firebase/auth';      // Firebase Authentication (optional)

// Your Firebase configuration, copy this from the Firebase Console
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-app-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};

// Initialize Firebase if it hasn't been initialized already
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export the Firestore database for use in other files
const db = firebase.firestore();

export { db };
