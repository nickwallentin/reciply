import React from "react"
import styled from "styled-components"

import AddIcon from "../../assets/icons/add-stroke.svg"
import SubIcon from "../../assets/icons/remove-stroke.svg"

const ServingsTime = ({
  servings,
  setServings,
  cookingTime,
  setCookingTime,
}) => {
  return (
    <MetaContainer>
      <Control>
        <div onClick={() => setServings(prevState => prevState - 1)}>
          <SubIcon />
        </div>
        <div>
          {servings}
          <small>servings</small>
        </div>
        <div onClick={() => setServings(prevState => prevState + 1)}>
          <AddIcon />
        </div>
      </Control>
      <Control>
        <div onClick={() => setCookingTime(prevState => prevState - 5)}>
          <SubIcon />
        </div>
        <div>
          {cookingTime} min
          <small>cooking time</small>
        </div>
        <div onClick={() => setCookingTime(prevState => prevState + 5)}>
          <AddIcon />
        </div>
      </Control>
    </MetaContainer>
  )
}

export default ServingsTime

const MetaContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin: 0px 0px 20px 0px;
`
const Control = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--c-bg);
  border-radius: 5px;
  position: relative;
  font-weight: 500;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 10px 5px;
    height: 100%;
    &:nth-child(2) {
      border-right: 1px solid var(--c-bg-s);
      border-left: 1px solid var(--c-bg-s);
      flex: 1;
    }
  }
  small {
    display: block;
    line-height: 0.8rem;
    color: var(--c-txt-soft);
    font-weight: 300;
  }
  svg {
    path {
      fill: var(--c-icon-l);
    }
  }
`
