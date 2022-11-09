import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage} from "firebase/storage";
import {ref as storageRef} from "firebase/storage"


// Agregar configuración firebase:
const firebaseConfig = {
    apiKey: "AIzaSyBoLFhBt5jNIkk7YP-H0Y3_UZlVqpzp4w4",
    authDomain: "fpi-project-c21aa.firebaseapp.com",
    projectId: "fpi-project-c21aa",
    storageBucket: "fpi-project-c21aa.appspot.com",
    messagingSenderId: "524330730985",
    appId: "1:524330730985:web:da1f14e363d159907ef778",
    measurementId: "G-72RFY5T781"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage();


export {db,collection,getDocs,storage,storageRef};