import React from "react"
import RootWrapper from "./src/firebase/rootWrapper"

// WRAP ENITE APP WITH ROOTWRAPPER
export const wrapRootElement = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>
}
