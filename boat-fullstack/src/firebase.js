// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnWZJ7SyH04DJp-FpgY-Gv7uW68JsRF3Q",
  authDomain: "boat-clone.firebaseapp.com",
  projectId: "boat-clone",
  storageBucket: "boat-clone.appspot.com",
  messagingSenderId: "107471241234",
  appId: "1:107471241234:web:0b249330e7aad21eda18cb"
  
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export default app;