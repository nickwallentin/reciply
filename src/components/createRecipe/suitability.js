import React, { useState } from "react"
import styled from "styled-components"

import { Card } from "../styled"

import CheckedIcon from "../../assets/icons/radio-checked.svg"
import UncheckedIcon from "../../assets/icons/radio-unchecked.svg"

const Suitability = ({ suitability, setSuitability }) => {
  const listItems = [
    "vegan",
    "vegetarian",
    "gluten-free",
    "lactose-free",
    "soy-free",
    "paleo",
    "low carb, high fat",
  ]
  const handleAddItem = value => {
    var exists = suitability.includes(value)
    var index = suitability.indexOf(value)
    var holder = suitability
    if (!exists) {
      holder.push(value)
      setSuitability([...holder])
      console.log(suitability)
    } else {
      holder.splice(index, 1)
      setSuitability([...holder])
      console.log(suitability)
    }
  }
  return (
    <Card flexHeader cSpace="0px">
      <div className="card-header">
        <h4>Suitability</h4>
        {suitability.length > 0 && <small>{suitability.length} checked</small>}
      </div>
      <div className="card-content">
        <SuitabilityList>
          {listItems.map(item => (
            <div
              key={item}
              onClick={() => handleAddItem(item)}
              className={
                suitability.includes(item) ? "checkbox checked" : "checkbox"
              }
            >
              {item.replace("-", " ")}{" "}
              {suitability.includes(item) ? <CheckedIcon /> : <UncheckedIcon />}
            </div>
          ))}
        </SuitabilityList>
      </div>
    </Card>
  )
}

export default Suitability

const SuitabilityList = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    padding: 10px 20px;
    text-transform: capitalize;
    margin: 0px;
    border-top: 1px solid var(--c-bg);
    cursor: pointer;
    &:first-of-type {
      border-top: 0px;
    }

    &.checked {
      background: var(--c-pri-soft);
      color: var(--c-pri);

      svg {
        path {
          fill: var(--c-pri);
        }
      }
    }

    svg {
      path {
        fill: var(--c-icon-l);
      }
    }
  }
`
