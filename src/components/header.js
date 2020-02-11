import React from "react"
import styled from "styled-components"
import { ThemeToggler } from "gatsby-plugin-dark-mode"

import { Wrap } from "./styled"

const Header = ({ page }) => (
  <header>
    <Wrap>
      <HeaderContainer>
        <div>1</div>
        <div>{page}</div>
        <div>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <div
                onClick={() => toggleTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "light" : "dark"}
              </div>
            )}
          </ThemeToggler>
        </div>
      </HeaderContainer>
    </Wrap>
  </header>
)

export default Header

const HeaderContainer = styled.div`
  padding: 20px 0px;
  display: flex;
  justify-content: space-between;
  color: var(--c-txt);
`
