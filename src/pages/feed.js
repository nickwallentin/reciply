import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { Sec, Wrap, Grid } from "../components/styled"

import RecipeList from "../components/Recipes/recipeList"

const FeedPage = () => {
  return (
    <Layout page="Feed">
      <SEO title="Feed" />
      <Sec>
        <Wrap>
          <RecipeList />
        </Wrap>
      </Sec>
    </Layout>
  )
}

export default FeedPage
