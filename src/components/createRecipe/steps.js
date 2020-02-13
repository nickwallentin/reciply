import React, { useState } from "react"
import styled from "styled-components"

import { Grid, Card, Form, Button, Textarea } from "../../components/styled"

import AddIcon from "../../assets/icons/add-stroke.svg"
import DoneIcon from "../../assets/icons/check.svg"
import ClearIcon from "../../assets/icons/clear.svg"
import MoreIcon from "../../assets/icons/more.svg"
import EditIcon from "../../assets/icons/edit.svg"
import RemoveIcon from "../../assets/icons/delete.svg"

const Steps = ({
  instructions,
  setInstructions,
  cookingTime,
  setCookingTime,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setIsEditingIndex] = useState(null)
  const [listMenu, setListMenu] = useState({ open: false, index: null })
  const [inputValue, setInputValue] = useState("")

  const resetFields = e => {
    e.preventDefault()
    setIsEditing(false)
    setIsEditingIndex(null)
    setListMenu({ open: false, index: null })
    setIsAdding(false)
    setInputValue("")
  }
  const handleAddItem = e => {
    e.preventDefault()
    var stepsCopy = instructions

    if (inputValue !== "") {
      if (isEditing) {
        stepsCopy[editingIndex] = inputValue
        setInstructions([...stepsCopy])
      } else {
        stepsCopy.push(inputValue)
        setInstructions([...stepsCopy])
      }
    }

    resetFields(e)
  }
  const handleRemoveItem = (e, index) => {
    e.preventDefault()
    var secondStepsCopy = instructions

    secondStepsCopy.splice(index, 1)
    setInstructions([...secondStepsCopy])
    resetFields(e)
  }
  const handleStartEditing = (e, step, index) => {
    e.preventDefault()
    setIsEditing(true)
    setIsEditingIndex(index)
    setInputValue(step)
  }
  const handleStartAdding = e => {
    resetFields(e)
    e.preventDefault()
    setIsAdding(true)
  }

  const handleToggleListMenu = index => {
    if (listMenu.open && index === listMenu.index) {
      setListMenu({ open: false, index: null })
    } else {
      setListMenu({ open: true, index: index })
    }
  }

  return (
    <Card flexHeader cSpace="0px">
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
            <React.Fragment key={instruction + index}>
              {editingIndex !== index && (
                <li>
                  <span>
                    Step {index + 1}{" "}
                    <MoreIcon onClick={() => handleToggleListMenu(index)} />
                  </span>
                  {instruction}
                  {listMenu.open && listMenu.index === index ? (
                    <IngredientOptions
                      className="inline"
                      pose={inputValue ? "enter" : "exit"}
                    >
                      <button
                        onClick={e => handleStartEditing(e, instruction, index)}
                        type="submit"
                      >
                        <EditIcon />
                        Edit
                      </button>
                      <button onClick={e => handleRemoveItem(e, index)}>
                        <RemoveIcon />
                        Remove
                      </button>
                    </IngredientOptions>
                  ) : null}
                </li>
              )}

              {isEditing && editingIndex === index ? (
                <li>
                  <span>Step {index + 1}</span>
                  <Textarea
                    className="invisible"
                    placeholder="Type an instruction"
                    value={inputValue}
                    autoFocus
                    onChange={e => setInputValue(e.target.value)}
                  ></Textarea>
                  <IngredientOptions
                    className="inline"
                    pose={inputValue ? "enter" : "exit"}
                  >
                    <button onClick={e => handleAddItem(e)} type="submit">
                      <DoneIcon />
                      Done
                    </button>
                    <button onClick={e => resetFields(e)}>
                      <ClearIcon />
                      Cancel
                    </button>
                  </IngredientOptions>
                </li>
              ) : null}
            </React.Fragment>
          ))}
          {isAdding && (
            <li>
              <span>Step {instructions.length + 1}</span>
              <Textarea
                className="invisible"
                placeholder="Type an instruction"
                autoFocus
                onChange={e => setInputValue(e.target.value)}
              ></Textarea>
              <IngredientOptions
                className="inline"
                pose={inputValue ? "enter" : "exit"}
              >
                <button onClick={e => handleAddItem(e)} type="submit">
                  <DoneIcon />
                  Done
                </button>
                <button onClick={e => resetFields(e)}>
                  <ClearIcon />
                  Cancel
                </button>
              </IngredientOptions>
            </li>
          )}
        </InstructionsList>
      </div>
      <div className="card-footer" style={{ padding: "5px" }}>
        <Button full invisible onClick={e => handleStartAdding(e)}>
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
    margin: 20px;

    &:nth-child(even) {
      background: var(--c-bg-s);
    }
    span {
      margin-bottom: 5px;
      font-weight: 500;

      color: var(--c-pri);
      display: flex;
      justify-content: space-between;
      align-items: center;
      svg {
        path {
          fill: var(--c-icon-l);
        }
      }
    }
  }
`
const IngredientOptions = styled.div`
  margin: 0px 20px;
  background: var(--c-bg-d);
  border-radius: 5px;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-evenly;
  color: var(--c-txt-inv);
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 0.7rem;
  margin-top: 0px;
  padding: 0px;
  &.inline {
    margin: 0px;
    margin-top: 10px;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    path {
      fill: var(--c-icon-d);
    }
  }
  button {
    color: var(--c-txt-inv);
    display: flex;
    align-items: center;
    padding: 10px;
    background: transparent;
    border: none;
  }
`
