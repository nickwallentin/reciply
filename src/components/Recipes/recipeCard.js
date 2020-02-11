import React, { useState, useEffect } from "react"
import store from "store"
import { getFirebase } from "../../firebase/firebase"
import { Link } from "gatsby"
import Img from "gatsby-image"
import styled from "styled-components"

import LikeIcon from "../../assets/icons/heart.svg"
import LikedIcon from "../../assets/icons/heart-liked.svg"
import CommentIcon from "../../assets/icons/comment.svg"

const RecipeCard = ({ recipe }) => {
  const firebase = getFirebase()
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(recipe.likes)
  const db = firebase.firestore()
  const user = store.get("user")
  const FieldValue = firebase.firestore.FieldValue
  const increment = FieldValue.increment(1)
  const decrement = FieldValue.increment(-1)

  const likeRecipe = () => {
    if (!liked) {
      setLikes(prevState => prevState + 1)
      setLiked(true)
      db.doc("/recipes/" + recipe.id).update({
        likes: increment,
        likedBy: FieldValue.arrayUnion(db.doc("/users/" + user.uid)),
      })
    } else {
      setLikes(prevState => prevState - 1)
      setLiked(false)
      db.doc("/recipes/" + recipe.id).update({
        likes: decrement,
        likedBy: FieldValue.arrayRemove(db.doc("/users/" + user.uid)),
      })
    }
  }
  const handleDoubleClick = () => {
    console.log("Double clicked!")
  }

  useEffect(() => {
    const exists = recipe.likedBy.filter(i => {
      return i.id === user.uid
    })

    if (exists.length > 0) {
      setLiked(true)
    }
  }, [])

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
        <RecipeActions>
          {liked ? (
            <LikedIcon onClick={() => likeRecipe()} className="liked" />
          ) : (
            <LikeIcon onClick={() => likeRecipe()} />
          )}
          <CommentIcon className="comment" />
        </RecipeActions>
        <span className="likes">
          {liked && likes > 1
            ? "You and " + likes + " others liked this"
            : liked && likes === 1
            ? "You liked this"
            : likes === 1
            ? likes + " like"
            : likes + " likes"}
        </span>
        <h4>{recipe.name}</h4>
        <p>{recipe.description}</p>
      </RecipeContent>
      <RecipeComments>
        <strong>View all 23 comments</strong>
      </RecipeComments>
      <RecipeLink to="/">See recipe</RecipeLink>
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

const RecipeActions = styled.div`
  padding: 10px 0px;
  border-bottom: 1px solid var(--c-border);
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;

    &.liked {
      path {
        fill: var(--c-pri);
      }
    }

    &:first-of-type {
      margin-right: 15px;
    }
    &.comment {
      path {
        fill: none;
      }
      g {
        stroke: var(--c-txt);
      }
    }
    path {
      fill: var(--c-txt);
    }
  }
`

const RecipeContent = styled.div`
  padding: 0px 20px 20px 20px;

  p {
    margin: 0px;
    font-size: 14px;
    line-height: 18px;
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
