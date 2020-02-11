import React, { useState, useEffect } from "react"
import store from "store"
import { navigate } from "gatsby"

const ProtectedRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(store.get("user") ? true : false)

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login")
    }
  }, [loggedIn])
  return <React.Fragment>{loggedIn && children}</React.Fragment>
}

export default ProtectedRoute
