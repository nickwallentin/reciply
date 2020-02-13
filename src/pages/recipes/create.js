import React, { useState } from "react"
import store from "store"
import * as moment from "moment"
import { getFirebase } from "../../firebase/firebase"

import ProtectedRoute from "../../components/utils/protectedRoute"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Sec, Wrap, Button } from "../../components/styled"

import ImageUploader from "../../components/createRecipe/imageUploader"
import Ingredients from "../../components/createRecipe/ingredients"
import Steps from "../../components/createRecipe/steps"
import Suitability from "../../components/createRecipe/suitability"
import ServingsTime from "../../components/createRecipe/servingsTime"

import AddIcon from "../../assets/icons/add-fill.svg"

const CreateRecipePage = () => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [servings, setServings] = useState(2)
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])
  const [suitability, setSuitability] = useState([])
  const [cookingTime, setCookingTime] = useState(15)

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
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
                steps: instructions,
                suitability: suitability,
                servings: servings,
                user: db.doc("/users/" + user.uid),
                system: userData.system,
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
    <ProtectedRoute>
      <Layout page="Create recipe">
        <SEO title="Create new recipe" />
        <Sec>
          <Wrap>
            <ImageUploader
              setImage={setImage}
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
            />

            <ServingsTime
              servings={servings}
              setServings={setServings}
              cookingTime={cookingTime}
              setCookingTime={setCookingTime}
            />
          </Wrap>
          <Wrap full>
            <Ingredients
              ingredients={ingredients}
              setIngredients={setIngredients}
              servings={servings}
              setServings={setServings}
            />

            <Steps
              instructions={instructions}
              setInstructions={setInstructions}
              cookingTime={cookingTime}
              setCookingTime={setCookingTime}
            />
            <Suitability
              suitability={suitability}
              setSuitability={setSuitability}
            />
          </Wrap>
          <Wrap>
            {" "}
            <Button style={{ marginTop: "15px" }} full large cta>
              <AddIcon />
              Create recipe
            </Button>
          </Wrap>
        </Sec>
      </Layout>
    </ProtectedRoute>
  )
}

export default CreateRecipePage
