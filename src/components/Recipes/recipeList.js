import React from "react"

import { graphql, useStaticQuery } from "gatsby"

import RecipeCard from "../Recipes/recipeCard"

const RecipeList = () => {
  const { allRecipes } = useStaticQuery(query)
  console.log(allRecipes)
  return (
    <React.Fragment>
      {allRecipes.edges.map(({ node: recipe }) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </React.Fragment>
  )
}

export default RecipeList

const query = graphql`
  query getAllRecipes {
    allRecipes(sort: { fields: [created, likes], order: [DESC, DESC] }) {
      edges {
        node {
          id
          name
          description
          created
          likes
          likedBy {
            id
          }
          imageUrl {
            childImageSharp {
              fluid(maxWidth: 900) {
                ...GatsbyImageSharpFluid
              }
            }
          }

          servings
          cookingTime
          ingredients {
            amount
            amountType
            ingredient
          }
          instructions
          suitability
          user {
            displayName
            system
          }
        }
      }
    }
  }
`
