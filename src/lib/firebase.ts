// TODO: Pendiente migrar configuración a variables de entorno (PUBLIC_FIREBASE_*)
// Actualmente hardcoded para desarrollo. Para producción, usar import.meta.env.PUBLIC_FIREBASE_*

import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBml1mbM6olzTPcA80BuLrt-NQW2ZYKezE",
  authDomain: "tokidev-ai-mentorias.firebaseapp.com",
  projectId: "tokidev-ai-mentorias",
  storageBucket: "tokidev-ai-mentorias.firebasestorage.app",
  messagingSenderId: "1006376031241",
  appId: "1:1006376031241:web:dcae0e8e9cae171d75d4d8",
  measurementId: "G-NTV5MVYTR5",
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

export function getFirebase() {
  if (typeof window === "undefined") return null;
  
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  
  return app;
}

export function getFirebaseDb(): Firestore | null {
  if (typeof window === "undefined") return null;
  
  if (!db) {
    const firebaseApp = getFirebase();
    if (firebaseApp) {
      db = getFirestore(firebaseApp);
    }
  }
  
  return db;
}

export function getFirebaseAnalytics(): Analytics | null {
  if (typeof window === "undefined") return null;
  
  if (!analytics) {
    const firebaseApp = getFirebase();
    if (firebaseApp && import.meta.env.PROD) {
      analytics = getAnalytics(firebaseApp);
    }
  }
  
  return analytics;
}
