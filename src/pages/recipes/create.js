import React, { useState } from "react"

import ProtectedRoute from "../../components/utils/protectedRoute"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import { Sec, Wrap } from "../../components/styled"

import ImageUploader from "../../components/createRecipe/imageUploader"
import Ingredients from "../../components/createRecipe/ingredients"
import Steps from "../../components/createRecipe/steps"
import Suitability from "../../components/createRecipe/suitability"
import ServingsTime from "../../components/createRecipe/servingsTime"

const CreateRecipePage = () => {
  const [image, setImage] = useState(null)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [servings, setServings] = useState(2)
  const [ingredients, setIngredients] = useState([])
  const [instructions, setInstructions] = useState([])
  const [suitability, setSuitability] = useState([])
  const [cookingTime, setCookingTime] = useState(15)

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
        </Sec>
      </Layout>
    </ProtectedRoute>
  )
}

export default CreateRecipePage
