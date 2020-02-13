import React, { useState } from "react"
import store from "store"
import styled from "styled-components"
import posed, { PoseGroup } from "react-pose"
import convert from "convert-units"

import { Grid, Card, Button, Form, Input } from "../styled"
import AddIcon from "../../assets/icons/add-stroke.svg"
import ClearIcon from "../../assets/icons/clear.svg"
import DoneIcon from "../../assets/icons/check.svg"
import EditIcon from "../../assets/icons/edit.svg"
import DeleteIcon from "../../assets/icons/delete.svg"

import MoreIcon from "../../assets/icons/more.svg"

const Ingredients = ({ ingredients, setIngredients }) => {
  const userData = store.get("userData")
  const massList = convert().list("mass")
  const volumeList = convert().list("volume")
  const measurements = massList.concat(volumeList)

  const um = measurements.filter(m => {
    return m.system === userData.system
  })
  console.log(um)

  const [isAdding, setIsAdding] = useState(false)
  const [listMenu, setListMenu] = useState({ open: false, index: 0 })
  const [inputValue, setInputValue] = useState("")
  const [ingredientAmount, setIngredientAmount] = useState("")
  const [ingredientAmountType, setIngredientAmountType] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [ingredientIndex, setIngredientIndex] = useState(0)

  const resetFields = e => {
    e.preventDefault()
    setListMenu({ open: false, index: 0 })
    setIsAdding(false)
    setInputValue("")
    setIngredientAmount("")
    setIngredientAmountType("")
    setIsEditing(false)
    setEditingIndex(null)
  }
  const handleStartAddItem = e => {
    setIsEditing(false)
    setInputValue("")
    setIngredientAmount("")
    setIngredientAmountType("")
    setEditingIndex(null)
    setIsAdding(true)
    setListMenu({ open: false, index: null })
  }
  const handleAddInput = e => {
    let ingredientsCopy = ingredients
    e.preventDefault()
    if (inputValue !== "") {
      let newIngredient = {
        ingredient: inputValue,
        amount: ingredientAmount,
        amountType: ingredientAmountType,
      }
      if (isEditing) {
        ingredientsCopy[ingredientIndex] = newIngredient
        setIngredients(ingredientsCopy)
      } else {
        ingredientsCopy.push(newIngredient)

        setIngredients([...ingredientsCopy])
      }

      resetFields(e)
    }
  }

  const handleStartEditItem = (event, data, ingredientIndex) => {
    event.preventDefault()
    resetFields(event)
    setListMenu({ open: false, index: ingredientIndex })
    setIngredientIndex(ingredientIndex)
    setIsEditing(true)
    setEditingIndex(ingredientIndex)
    setInputValue(data.ingredient)
    setIngredientAmount(data.amount)
    setIngredientAmountType(data.amountType)
  }

  const handleDeleteItem = e => {
    e.preventDefault()
    resetFields(e)
    var newState = ingredients
    newState.splice(ingredientIndex, 1)
    setIngredients([...newState])
  }

  const handleToggleListMenu = (e, iIndex) => {
    resetFields(e)
    if (listMenu.open && listMenu.index !== iIndex) {
      setListMenu({
        open: true,
        index: iIndex,
      })
    } else {
      setListMenu({
        open: !listMenu.open,
        index: iIndex,
      })
    }
    setIngredientIndex(iIndex)
  }

  return (
    <Card flexHeader cSpace="0px">
      <div className="card-header">
        <h4>Ingredients</h4>
        {ingredients.length > 0 && (
          <small>
            {ingredients.length}{" "}
            {ingredients.length > 1 ? "ingredients" : "ingredient"}
          </small>
        )}
      </div>
      <div className="card-content">
        {ingredients.length > 0 && (
          <IngredientList>
            {ingredients.map((ingredient, iIndex) => {
              return (
                <React.Fragment key={JSON.stringify(ingredient)}>
                  <li
                    className={
                      editingIndex === iIndex
                        ? "hide"
                        : ingredientIndex === iIndex && listMenu.open
                        ? "menu-open"
                        : null
                    }
                  >
                    <span className="amount">
                      {ingredient.amount} {ingredient.amountType}
                    </span>{" "}
                    <span style={{ flex: "1" }}>{ingredient.ingredient}</span>
                    <span className="actions">
                      <span
                        onClick={e => {
                          handleToggleListMenu(e, iIndex)
                        }}
                      >
                        <MoreIcon />
                      </span>
                    </span>
                  </li>

                  {isEditing && ingredientIndex === iIndex ? (
                    <IngredientEdit
                      className={
                        iIndex === 0
                          ? "first"
                          : ingredients.length - 1 === iIndex
                          ? "last"
                          : null
                      }
                      name="Add ingredient"
                    >
                      <div className="input-fields">
                        <div className="amount">
                          <Input
                            invisible
                            type="number"
                            placeholder="200"
                            autoFocus
                            min="1"
                            max="999"
                            value={ingredientAmount}
                            onChange={e => setIngredientAmount(e.target.value)}
                          />
                          <Input
                            invisible
                            type="text"
                            placeholder="g"
                            value={ingredientAmountType}
                            onChange={e =>
                              setIngredientAmountType(e.target.value)
                            }
                          />
                        </div>
                        <div className="ingredient-name">
                          <Input
                            type="text"
                            placeholder="Egg Plant"
                            value={inputValue}
                            onChange={e => setInputValue(e.target.value)}
                          />
                        </div>
                      </div>

                      <IngredientOptions pose={inputValue ? "enter" : "exit"}>
                        <button onClick={e => handleAddInput(e)} type="submit">
                          <DoneIcon />
                          Done
                        </button>
                        <button onClick={e => resetFields(e)}>
                          <ClearIcon />
                          Cancel
                        </button>
                      </IngredientOptions>
                    </IngredientEdit>
                  ) : null}
                  {listMenu.open && listMenu.index === iIndex ? (
                    <IngredientEdit name="Add ingredient">
                      <IngredientOptions>
                        <button
                          onClick={e =>
                            handleStartEditItem(e, ingredient, iIndex)
                          }
                          type="submit"
                        >
                          <EditIcon />
                          Edit
                        </button>

                        <button onClick={e => handleDeleteItem(e)}>
                          <DeleteIcon />
                          Delete
                        </button>
                      </IngredientOptions>
                    </IngredientEdit>
                  ) : null}
                </React.Fragment>
              )
            })}
          </IngredientList>
        )}
        {isAdding && (
          <IngredientEdit
            className={isAdding ? "is-adding" : null}
            name="Add ingredient"
          >
            <div className="input-fields">
              <div className="amount">
                <Input
                  invisible
                  type="number"
                  placeholder="200"
                  autoFocus
                  min="1"
                  max="999"
                  value={ingredientAmount}
                  onChange={e => setIngredientAmount(e.target.value)}
                />
                <Input
                  invisible
                  type="text"
                  placeholder="g"
                  value={ingredientAmountType}
                  onChange={e => setIngredientAmountType(e.target.value)}
                />
              </div>
              <div className="ingredient-name">
                <Input
                  type="text"
                  placeholder="Egg Plant"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                />
              </div>
            </div>

            <IngredientOptions pose={inputValue ? "enter" : "exit"}>
              <button onClick={e => handleAddInput(e)} type="submit">
                <DoneIcon />
                Done
              </button>
              <button onClick={e => resetFields(e)}>
                <ClearIcon />
                Cancel
              </button>
            </IngredientOptions>
          </IngredientEdit>
        )}
      </div>
      <div className="card-footer" style={{ padding: "5px" }}>
        <Button full invisible onClick={() => handleStartAddItem()}>
          <AddIcon /> Ingredient
        </Button>
      </div>
    </Card>
  )
}

export default Ingredients

const IngredientList = styled.ul`
  margin: 0px;

  list-style: none;

  .actions {
  }
  & > form {
    &:first-of-type {
      padding-top: 0px;
    }
    &:last-of-type {
      padding-bottom: 0px;
    }
  }
  & > li {
    font-weight: 500;
    display: grid;
    grid-template-columns: 75px 1fr 20px;
    padding: 20px;
    margin-bottom: 0px;
    border-top: 1px dotted var(--c-border);

    &.hide {
      display: none;
    }

    .amount {
      font-weight: 300;
      color: var(--c-pri);
    }

    &:first-of-type {
      border-top: none;
    }

    &.menu-open {
      svg {
        path {
          fill: var(--c-pri);
        }
      }
    }

    span {
      display: flex;
      align-items: center;
      svg {
        width: 20px;
        height: 20px;
        path {
          fill: var(--c-txt-60);
        }
      }
    }
  }
`
const IngredientEdit = styled.form`
  margin-bottom: 0px;

  margin-bottom: 20px;

  &.is-adding {
    border-top: 1px dotted var(--c-border);
  }

  &.first {
    .input-fields {
      padding-top: 0px;
    }
  }
  &.last {
    .input-fields {
      padding-bottom: 10px;
    }
  }
  .input-fields {
    display: grid;
    grid-template-columns: 75px 1fr;
    margin: 0px;
    padding: 20px;

    input {
      margin: 0px !important;
      padding: 0px;
      border: 0px;
      background: transparent;
    }
  }

  div.amount {
    display: flex;
  }
  div.ingredient-name {
    flex: 1;
    font-weight: 500;
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
