import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA4HejIS-Cgrr8qSO7eI2F2oLR7FRbLdoU",
  authDomain: "todo-app-jvaughan007.firebaseapp.com",
  projectId: "todo-app-jvaughan007",
  storageBucket: "todo-app-jvaughan007.appspot.com",
  messagingSenderId: "21942526785",
  appId: "1:21942526785:web:292dfb928479a9a5e937c0"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };
