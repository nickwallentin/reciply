import React, { useState } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import { Sec, Wrap, Grid, Card } from "../components/styled"
import RecipeActions from "../components/Recipes/recipeActions"

import CheckIcon from "../assets/icons/check.svg"

const SingleRecipeTemplate = ({ data }) => {
  const recipe = data.recipes
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(recipe.likes)
  const [servings, setServings] = useState(recipe.servings)
  const [finishedSteps, setFinishedSteps] = useState([])

  const handleUpdateServings = type => {
    if (type === "add") {
      setServings(prevState => prevState + 1)
    } else if (type === "subtract") {
      setServings(prevState => prevState - 1)
    }
  }

  const handleMarkStepComplete = step => {
    var stepsTemp = finishedSteps
    if (finishedSteps.includes(step)) {
      let i = stepsTemp.indexOf(step)
      stepsTemp.splice(i, 1)
      setFinishedSteps([...stepsTemp])
    } else {
      stepsTemp.push(step)
      setFinishedSteps([...stepsTemp])
    }
  }

  return (
    <Layout>
      <Sec>
        <Wrap>
          <Grid gap="6vmin" mGap="0px" cols="1fr 1fr">
            <Img
              style={{ borderRadius: "5px" }}
              fluid={recipe.imageUrl.childImageSharp.fluid}
            />

            <RecipeMeta>
              <RecipeActions
                recipe={recipe}
                likes={likes}
                liked={liked}
                setLikes={setLikes}
                setLiked={setLiked}
              />
              <small className="likes">
                {liked && likes > 1
                  ? "You and " + (likes - 1) + " more liked this"
                  : liked && likes === 1
                  ? "You liked this"
                  : likes === 1
                  ? likes + " like"
                  : likes + " likes"}
              </small>
              <h1>{recipe.name}</h1>
              <p>{recipe.description}</p>
              <div className="suitability">
                <div>Suitability:</div>
                {recipe.suitability.map((s, i) => (
                  <span className="suitability-item">{s}</span>
                ))}
              </div>
            </RecipeMeta>
          </Grid>
          <Card style={{ marginTop: "20px" }} flexHeader>
            <div className="card-header">
              <h4>Ingredients</h4>
              <ServingControl>
                <span onClick={() => handleUpdateServings("subtract")}>-</span>
                {servings} servings
                <span onClick={() => handleUpdateServings("add")}>+</span>
              </ServingControl>
            </div>
            <div className="card-content">
              <IngredientList>
                {recipe.ingredients.map((ingredient, ingredientIndex) => {
                  return (
                    <li key={ingredient.ingredient}>
                      <span className="amount" style={{ width: "80px" }}>
                        {ingredient.amount} {ingredient.amountType}
                      </span>{" "}
                      <span style={{ flex: "1" }}>{ingredient.ingredient}</span>
                      <span className="actions">add</span>
                    </li>
                  )
                })}
              </IngredientList>
            </div>
          </Card>
          <Card>
            <div className="card-header">
              <h4>Instructions</h4>
            </div>
            <div className="card-content">
              <InstructionsList>
                {recipe.instructions.map((instruction, index) => (
                  <li
                    className={
                      finishedSteps.includes(instruction) ? "completed" : null
                    }
                    onClick={() => handleMarkStepComplete(instruction)}
                    key={instruction + index}
                  >
                    <div className="checkmark">
                      {finishedSteps.includes(instruction) && <CheckIcon />}
                    </div>
                    <div>{instruction}</div>
                  </li>
                ))}
              </InstructionsList>
            </div>
          </Card>
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default SingleRecipeTemplate

const RecipeMeta = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .likes {
    font-weight: 500;
  }

  .suitability {
    .suitability-item {
      padding: 5px 8px;
      margin: 0px 2.5px;
      border-radius: 5px;
      background: var(--c-pri);
      color: white;
      &:first-of-type {
        margin-left: 0px;
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
    .amount {
      font-weight: 500;
      display: block;
    }

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

const InstructionsList = styled.ol`
  list-style: none;
  margin: 0;
  li {
    padding: 8px 6px 8px 15px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 24px 1fr;
    cursor: pointer;
    &.completed {
      text-decoration: line-through;
      color: var(--c-txt-60);

      .checkmark {
        background: var(--c-pri);
        border-color: var(--c-pri);
      }
    }
    &:nth-child(even) {
      background: var(--c-bg-s);
    }
    span {
      margin-right: 20px;
      font-weight: 500;
    }
  }

  .checkmark {
    width: 24px;
    height: 24px;
    background: var(--c-bg-inv-20);
    border-radius: 99px;
    border: 1px solid var(--c-border);
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      path {
        fill: #ffffff;
      }
    }
  }
`

export const pageQuery = graphql`
  query recipeByID($id: String!) {
    recipes(id: { eq: $id }) {
      id
      name
      description
      ingredients {
        amount
        amountType
        ingredient
      }
      instructions
      suitability
      cookingTime
      servings
      likedBy {
        displayName
        id
      }
      likes
      measurementOrigin
      user {
        displayName
        id
      }
      imageUrl {
        childImageSharp {
          fluid(maxWidth: 900) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
