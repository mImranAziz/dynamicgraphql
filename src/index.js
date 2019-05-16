const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const qs = require('querystring')

const getObjectData = (entity, options) => {
  let url = `http://torwdiaziz01/devlogin/iadevform/api/v2/object/${entity}`
  if (options) {
    url += '?' + qs.stringify(options)
  }
  console.log(url);
  return fetch(url, {
    headers: {
      Authorization: 'Basic SU5URUxFWFxBZG1pbmlzdHJhdG9yOkFkbWluaXN0cmF0b3I=',
    },
  })
}

const resolvers = {
  Query: {
    Object: (a, { name }) => {
      return getObjectData('Eee_graphqlObject')
        .then(res => res.json())
        .then(json => json.value)
        .then(rec => {
          return rec;
        })
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
