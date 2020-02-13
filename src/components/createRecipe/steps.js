import React, { useState } from "react"
import styled from "styled-components"

import { Grid, Card, Form, Button } from "../../components/styled"

import AddIcon from "../../assets/icons/add-stroke.svg"

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
        <h4>Steps</h4>
        {instructions.length > 0 && (
          <small>
            {instructions.length} {instructions.length > 1 ? "steps" : "step"}
          </small>
        )}
      </div>
      <div className="card-content">
        <InstructionsList>
          {instructions.map((instruction, index) => (
            <li key={instruction + index}>
              <span>Step {index + 1}</span>
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
      </div>
      <div className="card-footer" style={{ padding: "5px" }}>
        <Button full invisible onClick={() => setIsAdding(true)}>
          <AddIcon /> Step
        </Button>
      </div>
    </Card>
  )
}

export default Steps

const InstructionsList = styled.ol`
  list-style: none;
  margin: 0;

  li {
    padding: 10px;
    background: var(--c-bg-s);
    border-radius: 5px;

    &:nth-child(even) {
      background: var(--c-bg-s);
    }
    span {
      margin-bottom: 5px;
      font-weight: 500;
      display: block;
      color: var(--c-pri);
    }
  }
`
