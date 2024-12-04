// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4jI6ags3xkfeNIMccFVIaKt9n-NBYUuM",
  authDomain: "visa-navigator-client-67a8d.firebaseapp.com",
  projectId: "visa-navigator-client-67a8d",
  storageBucket: "visa-navigator-client-67a8d.firebasestorage.app",
  messagingSenderId: "563017352256",
  appId: "1:563017352256:web:1efecc43d6be3d6f8a8ba5",
  measurementId: "G-WMLYQN909L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;