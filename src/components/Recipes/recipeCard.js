import React, { useState } from "react"

import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import RecipeActions from "./recipeActions"

const RecipeCard = ({ recipe }) => {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(recipe.likes)
  const slug =
    recipe.name.toLowerCase().replace(/\W+/g, "-") +
    "-" +
    recipe.created.replace(/[^0-9]+/g, "")

  return (
    <RecipeContainer>
      <RecipeHeader>
        <div className="user">
          <span className="avatar">{recipe.user.displayName.split("")[0]}</span>
          <strong>{recipe.user.displayName}</strong>
        </div>
      </RecipeHeader>

      <RecipeImage fluid={recipe.imageUrl.childImageSharp.fluid} />

      <RecipeContent>
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
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
      </RecipeContent>
      <RecipeComments>
        <strong>View all 23 comments</strong>
      </RecipeComments>
      <RecipeLink to={"/recipe/" + slug}>See recipe</RecipeLink>
    </RecipeContainer>
  )
}

export default RecipeCard

const RecipeContainer = styled.div`
  background: var(--c-bg);
  border-radius: 5px;
  margin-bottom: 20px;
`

const RecipeHeader = styled.div`
  padding: 10px 20px;
  .user {
    display: flex;
    align-items: center;
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 99px;
      background: var(--c-bg-s);
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: uppercase;
    }
  }
`

const RecipeContent = styled.div`
  padding: 0px 20px 20px 20px;

  p {
    margin: 0px;
  }
  .likes {
    font-weight: 500;
  }
`
const RecipeComments = styled.div`
  background: var(--c-bg-s);
  padding: 10px 20px;
  font-size: 12px;
`

const RecipeLink = styled(Link)`
  display: block;
  text-decoration: none;
  text-align: center;
  padding: 10px;
  font-weight: 500;
`

const RecipeImage = styled(Img)``
