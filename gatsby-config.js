require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Reciply`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@nickwallentin`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Rubik`,
            variants: [`400`, `500`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: "gatsby-source-firestore",
      options: {
        credential: {
          type: process.env.FIREBASE_TYPE,
          project_id: process.env.FIREBASE_PROJECT_ID,
          private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
          private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          client_email: process.env.FIREBASE_CLIENT_EMAIL,
          client_id: process.env.FIREBASE_CLIENT_ID,
          auth_uri: process.env.FIREBASE_AUTH_URI,
          token_uri: process.env.FIREBASE_TOKEN_URI,
          auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER,
          client_x509_cert_url: process.env.FIREBASE_CLIENT,
        },
        types: [
          {
            type: "Recipes",
            collection: "recipes",
            map: doc => ({
              id: doc.id,
              imageURL: doc.imageURL,
              name: doc.name,
              cookingTime: doc.cookingTime,
              description: doc.description,
              created: doc.created,
              likes: doc.likes,
              likedBy___NODE: doc.likedBy.map(user => user.id),
              ingredients: doc.ingredients,
              instructions: doc.instructions,
              measurementOrigin: doc.measurementOrigin,
              servings: doc.servings,
              suitability: doc.suitability,
              user___NODE: doc.user.id,
            }),
          },
          {
            type: "Users",
            collection: "users",
            map: doc => ({
              id: doc.id,
              displayName: doc.displayName,
              measurement: doc.measurement,
            }),
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "Recipes",
        imagePath: "imageURL",
        name: "imageUrl",
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-dark-mode`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
