import React, { useState } from "react"
import * as moment from "moment"
import styled from "styled-components"
import store from "store"
import { getFirebase } from "../../firebase/firebase"

import { Card, Form, Button } from "../../components/styled"

import LoadingIcon from "../../assets/icons/loading.svg"

const Meta = ({
  name,
  setName,
  description,
  setDescription,
  image,
  ingredients,
  instructions,
  suitability,
  servings,
  cookingTime,
}) => {
  const [loading, setLoading] = useState(false)
  const user = store.get("user")

  const firebase = getFirebase()

  const handleCreateRecipe = e => {
    e.preventDefault()
    setLoading(true)
    const storageRef = firebase.storage().ref()
    const db = firebase.firestore()
    const user = store.get("user")
    const userData = store.get("userData")
    const imageName = name.toLowerCase().replace(/\W+/g, "-") + "-" + user.uid
    const imageLocationRef = storageRef.child("images/" + imageName)
    imageLocationRef
      .put(image)
      .then(snap => {
        console.log(snap)
        storageRef
          .child(snap.metadata.fullPath)
          .getDownloadURL()
          .then(url => {
            db.collection("recipes")
              .add({
                name: name,
                description: description,
                imageURL: url,
                ingredients: ingredients,
                instructions: instructions,
                suitability: suitability,
                servings: servings,
                user: db.doc("/users/" + user.uid),
                measurementOrigin: userData.measurement,
                cookingTime: cookingTime,
                created: moment().toISOString(),
                likes: 0,
                likedBy: [],
                commentedBy: [],
              })
              .then(snap => {
                console.log("Added to db:", snap)
                setLoading(false)
              })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }
  return (
    <React.Fragment>
      <Card>
        <div className="card-header">
          <h4>Recipe information</h4>
        </div>
        <div className="card-content">
          <Form>
            <div className="input-group">
              <input
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Name"
              />
            </div>
            <div className="input-group">
              <textarea
                onChange={e => setDescription(e.target.value)}
                name="Description"
                placeholder="Description"
              ></textarea>
            </div>
            <Button
              onClick={e => handleCreateRecipe(e)}
              style={{ marginTop: "15px" }}
              full
              cta
            >
              Create recipe
            </Button>
          </Form>
        </div>
      </Card>
      {loading && (
        <Loading>
          <LoadingIcon />
          <h4>Looks delicious</h4>
          <p>Your recipe is being created. Please wait.</p>
        </Loading>
      )}
    </React.Fragment>
  )
}

export default Meta

const Loading = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background: var(--c-bg-s);

  svg {
    width: 44px;
    height: 44px;
    margin-bottom: 15px;
    animation: 1s spin infinite;
    path {
      fill: var(--c-pri);
    }
  }
`
