import React, { useState, useEffect } from "react"
import store from "store"
import { getFirebase } from "../../firebase/firebase"
import styled from "styled-components"

import LikeIcon from "../../assets/icons/heart.svg"
import LikedIcon from "../../assets/icons/heart-liked.svg"
import CommentIcon from "../../assets/icons/comment.svg"

const RecipeActions = ({ recipe, likes, liked, setLikes, setLiked }) => {
  const firebase = getFirebase()
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

  useEffect(() => {
    const exists = recipe.likedBy.filter(i => {
      return i.id === user.uid
    })

    if (exists.length > 0) {
      setLiked(true)
    }
  }, [])

  return (
    <RecipeActionsContainer>
      {liked ? (
        <LikedIcon onClick={() => likeRecipe()} className="liked" />
      ) : (
        <LikeIcon onClick={() => likeRecipe()} />
      )}
      <CommentIcon className="comment" />
    </RecipeActionsContainer>
  )
}

export default RecipeActions

const RecipeActionsContainer = styled.div`
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
