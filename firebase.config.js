import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "your-value-here",
  authDomain: "your-value-here",
  projectId: "your-value-here",
  storageBucket: "your-value-here",
  messagingSenderId: "your-value-here",
  appId: "your-value-here",
  measurementId: "your-value-here"
};

const firebase = initializeApp(firebaseConfig);
// const messaging = getMessaging(firebase);
const analytics = getAnalytics(firebase);

export default firebase