import React, { useState } from "react"
import { getFirebase } from "../firebase/firebase"
import store from "store"

const AuthContext = React.createContext()
export const AuthProvider = ({ children }) => {
  const firebase = getFirebase()
  const [user, setUser] = useState(store.get("user"))

  if (firebase) {
    firebase.auth().onAuthStateChanged(u => {
      if (u) {
        console.log("[DEBUG/AuthContext] user:", u)

        firebase
          .firestore()
          .doc(`/users/${u.uid}`)
          .get()
          .then(doc => {
            let data = doc.data()

            store.set("userData", data)
          })
          .catch(err => console.log("[ERROR/AuthContext]", err))
        if (!user) {
          store.set("user", u)
          setUser(u)
        }
        return "lol"
      } else {
        store.clearAll()
        setUser(null)
        store.remove("user")
        store.remove("userData")
        console.log("[DEBUG/AuthContext] no user")
      }
      return "lol"
    })
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export default AuthContext
