import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"

const config = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
}

let firebaseInstance
export const getFirebase = () => {
  if (firebaseInstance) {
    return firebaseInstance
  }
  if (typeof window !== undefined) {
    console.log("[DEBUG/getFirebase] Instance didn't exists, creating it")
    firebase.initializeApp(config)
    firebaseInstance = firebase
  }

  return firebase
}
