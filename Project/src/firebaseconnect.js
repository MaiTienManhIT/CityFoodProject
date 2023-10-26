import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyA3Ja8igIEZ2dNfO-SR57ikYQ7nZIMpEto",
    authDomain: "duan2-4ff5b.firebaseapp.com",
    databaseURL: "https://duan2-4ff5b-default-rtdb.firebaseio.com",
    projectId: "duan2-4ff5b",
    storageBucket: "duan2-4ff5b.appspot.com",
    messagingSenderId: "257253801610",
    appId: "1:257253801610:web:4f1d0344663f16655bb773",
    measurementId: "G-HHPK2SQZXH"
  };

  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const storage = getStorage(app);
  
  export { app, firestore, storage };
  