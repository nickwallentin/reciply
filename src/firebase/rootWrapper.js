import React from "react"
import { AuthProvider } from "../context/AuthContext"

const RootWrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>
export default RootWrapper
