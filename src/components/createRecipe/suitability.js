import React, { useState } from "react"
import styled from "styled-components"

import { Card } from "../styled"

import CheckIcon from "../../assets/icons/check.svg"

const Suitability = ({ suitability, setSuitability }) => {
  const listItems = [
    "vegan",
    "vegetarian",
    "gluten-free",
    "lactose-free",
    "soy-free",
    "paleo",
    "lchf",
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
    <Card>
      <div className="card-header">
        <h4>Suitability</h4>
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
              <span>{suitability.includes(item) && <CheckIcon />}</span> {item}
            </div>
          ))}
        </SuitabilityList>
      </div>
    </Card>
  )
}

export default Suitability

const SuitabilityList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-bottom: 15px;
    text-transform: capitalize;

    &.checked {
      span {
        background: var(--c-pri);
        border-color: var(--c-pri);
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          path {
            fill: #ffffff;
          }
        }
      }
    }
    span {
      display: block;
      width: 30px;
      height: 30px;
      background: var(--c-bg-s);
      border: 1px solid var(--c-border);
      border-radius: 5px;
      margin-right: 10px;
    }
  }
`
