const path = require("path")
const moment = require("moment")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allRecipes(limit: 1000) {
        edges {
          node {
            id
            name
            created
            user {
              id
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.error) {
      result.errors.forEach(e => console.log(e.toString()))
      return Promise.reject(result.errors)
    }

    const edges = result.data.allRecipes.edges

    edges.forEach(edge => {
      const slug =
        edge.node.name.toLowerCase().replace(/\W+/g, "-") +
        "-" +
        edge.node.created.replace(/[^0-9]+/g, "")
      const id = edge.node.id
      createPage({
        path: "/recipe/" + slug,
        component: path.resolve(`src/templates/SingleRecipeTemplate.js`),
        context: {
          id,
        },
      })
    })
  })
}
