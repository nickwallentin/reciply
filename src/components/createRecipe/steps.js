import React, { useState } from "react"
import styled from "styled-components"

import { Grid, Card, Form, Button } from "../../components/styled"

import AddIcon from "../../assets/icons/plus.svg"

const Steps = ({
  instructions,
  setInstructions,
  cookingTime,
  setCookingTime,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [inputValue, setInputValue] = useState("")

  const resetFields = e => {
    e.preventDefault()
    setIsAdding(false)
    setInputValue("")
  }
  const handleAddItem = e => {
    e.preventDefault()

    var instructionsHolder = instructions
    instructionsHolder.push(inputValue)
    setInstructions([...instructionsHolder])
    resetFields(e)
  }
  const handleUpdateCookingTime = type => {
    if (type === "add") {
      setCookingTime(prevState => prevState + 5)
    } else if (type === "subtract") {
      setCookingTime(prevState => prevState - 5)
    }
  }
  return (
    <Card flexHeader>
      <div className="card-header">
        <h4>Instructions</h4>

        <ServingControl>
          <span onClick={() => handleUpdateCookingTime("subtract")}>-</span>
          {cookingTime} minutes
          <span onClick={() => handleUpdateCookingTime("add")}>+</span>
        </ServingControl>
      </div>
      <div className="card-content">
        <InstructionsList>
          {instructions.map((instruction, index) => (
            <li key={instruction + index}>
              <span>{index + 1}</span>
              {instruction}
            </li>
          ))}
        </InstructionsList>
        {isAdding && (
          <Form>
            <div className="input-group">
              <textarea
                name="add-step"
                id=""
                cols="30"
                rows="2"
                placeholder="Type an instruction"
                onChange={e => setInputValue(e.target.value)}
              ></textarea>
            </div>
            <Grid cols="1fr 1fr" mCols="1fr 1fr">
              <Button onClick={e => resetFields(e)} full>
                Cancel
              </Button>
              <Button onClick={e => handleAddItem(e)} full cta>
                Add
              </Button>
            </Grid>
          </Form>
        )}

        {!isAdding && (
          <Button onClick={() => setIsAdding(true)} full>
            <AddIcon /> Instruction
          </Button>
        )}
      </div>
    </Card>
  )
}

export default Steps

const InstructionsList = styled.ol`
  list-style: none;
  margin: 0;
  li {
    padding: 8px 6px 8px 15px;
    display: grid;
    grid-template-columns: 25px 1fr;
    &:nth-child(even) {
      background: var(--c-bg-s);
    }
    span {
      margin-right: 20px;
      font-weight: 500;
    }
  }
`
const ServingControl = styled.div`
  display: flex;
  align-items: center;

  span {
    padding: 5px;
    font-weight: 500;
    cursor: pointer;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--c-border);
    margin: 0px 10px;
    border-radius: 3px;
  }
`
