import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAF_DIpXVQ6k6BeST4ydV2hFi6cbrEEABI",
  authDomain: "authentication-705c6.firebaseapp.com",
  projectId: "authentication-705c6",
  storageBucket: "authentication-705c6.appspot.com",
  messagingSenderId: "228134493883",
  appId: "1:228134493883:web:5a118ac27201c04106939e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;