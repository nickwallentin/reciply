import React, { useState } from "react"
import styled from "styled-components"

import { Grid, Card, Button, Form } from "../styled"
import PlusIcon from "../../assets/icons/plus.svg"
import CloseIcon from "../../assets/icons/close.svg"

import MoreIcon from "../../assets/icons/more.svg"

const Ingredients = ({
  ingredients,
  setIngredients,
  servings,
  setServings,
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [addingType, setIsAddingType] = useState("")
  const [inputValue, setInputValue] = useState("")
  const [ingredientAmount, setIngredientAmount] = useState("")
  const [ingredientAmountType, setIngredientAmountType] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [ingredientIndex, setIngredientIndex] = useState(0)

  const resetFields = e => {
    e.preventDefault()
    setIsAddingType("")
    setIsAdding(false)
    setInputValue("")
    setIngredientAmount("")
    setIngredientAmountType("")
    setIsEditing(false)
  }

  const handleSwitchToInput = type => {
    setIsAdding(true)
    setIsAddingType(type)
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

  const handleStartEditItem = (data, ingredientIndex, secIndex) => {
    setIngredientIndex(ingredientIndex)

    setIsEditing(true)
    setIsAdding(true)
    setIsAddingType("ingredient")
    setInputValue(data.ingredient)
    setIngredientAmount(data.amount)
    setIngredientAmountType(data.amountType)
  }
  const handleUpdateServings = type => {
    if (type === "add") {
      setServings(prevState => prevState + 1)
    } else if (type === "subtract") {
      setServings(prevState => prevState - 1)
    }
  }
  const handleDeleteItem = e => {
    e.preventDefault()
    resetFields(e)
    var newState = ingredients
    newState.splice(ingredientIndex, 1)
    setIngredients([...newState])
  }

  return (
    <Card flexHeader>
      <div className="card-header">
        <h4>Ingredients</h4>
        <ServingControl>
          <span onClick={() => handleUpdateServings("subtract")}>-</span>
          {servings} servings
          <span onClick={() => handleUpdateServings("add")}>+</span>
        </ServingControl>
      </div>
      <div className="card-content">
        {ingredients.length > 0 && (
          <IngredientList>
            {ingredients.map((ingredient, ingredientIndex) => {
              return (
                <li key={ingredient.ingredient}>
                  <span style={{ width: "80px" }}>
                    {ingredient.amount} {ingredient.amountType}
                  </span>{" "}
                  <span style={{ flex: "1" }}>{ingredient.ingredient}</span>
                  <span className="actions">
                    <span
                      onClick={() =>
                        handleStartEditItem(ingredient, ingredientIndex)
                      }
                    >
                      <MoreIcon />
                    </span>
                  </span>
                </li>
              )
            })}
          </IngredientList>
        )}
        <Grid>
          {!isAdding ? (
            <React.Fragment>
              <Button onClick={() => handleSwitchToInput("ingredient")}>
                <PlusIcon /> Ingredient
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Form style={{ marginTop: "20px" }}>
                <div className="input-group">
                  <input
                    onChange={e => setInputValue(e.target.value)}
                    value={inputValue}
                    placeholder={
                      addingType === "section"
                        ? 'Add section ex. "Dressing"'
                        : "Add ingredient"
                    }
                    type="text"
                  />
                </div>
                {addingType === "ingredient" && (
                  <div
                    style={{ marginTop: "10px" }}
                    className="input-group double"
                  >
                    <input
                      onChange={e => setIngredientAmount(e.target.value)}
                      value={ingredientAmount}
                      type="number"
                      placeholder="200"
                    />
                    <input
                      onChange={e => setIngredientAmountType(e.target.value)}
                      value={ingredientAmountType}
                      type="text"
                      placeholder="g"
                    />
                  </div>
                )}
                <Grid cols="1fr 1fr" mCols="1fr 1fr" gap="10px">
                  <Button full onClick={e => resetFields(e)}>
                    Cancel
                  </Button>
                  <Button full cta onClick={e => handleAddInput(e)}>
                    {isEditing ? "Update" : "Add"}
                  </Button>
                </Grid>
                {isEditing && (
                  <Button
                    style={{ marginTop: "10px" }}
                    full
                    onClick={e => handleDeleteItem(e)}
                  >
                    <CloseIcon /> Delete
                  </Button>
                )}
              </Form>
            </React.Fragment>
          )}
        </Grid>
      </div>
    </Card>
  )
}

export default Ingredients

const IngredientList = styled.ul`
  margin: 0px;
  margin-bottom: 15px;
  list-style: none;
  .actions {
  }
  & > li {
    font-weight: 300;
    display: flex;
    justify-content: space-between;
    padding: 8px 6px 8px 15px;
    margin-bottom: 0px;

    &:nth-child(even) {
      background: var(--c-bg-s);
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
