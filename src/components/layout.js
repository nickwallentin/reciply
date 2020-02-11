import React from "react"
import { getFirebase } from "../firebase/firebase"

import Header from "./header"
import "./layout.css"

const Layout = ({ children, page }) => {
  const firebase = getFirebase()
  return (
    <>
      <Header page={page} />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>{" "}
        <span onClick={() => firebase.auth().signOut()}>Sign out</span>
      </footer>
    </>
  )
}

export default Layout
