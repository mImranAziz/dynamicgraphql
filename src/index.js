const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const qs = require('querystring')

const getObjectData = (entity, options) => {
  let url = `http://torwdiaziz01/devlogin/iadevform/api/v2/object/${entity}`
  console.log(entity);
  console.log(options);
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

let tabs = [
  {
    id: '2',
    caption: 'My Tasks',
    index: 1,
  },
  {
    id: '3',
    caption: "My Staff's Tasks",
    index: 2,
  },
]

let views = [
  {
    id: '4',
    source: '...',
  },
]

let myTasksModule = {
  id: '1',
  urlCaption: 'MyTasks',
  caption: 'My Tasks',
  tabs: tabs,
  view: views[0],
}

const resolvers = {
  Query: {
    Application: (a, { urlCaption }) => {
      return getObjectData('Eee_graphqlObject')
        .then(res => res.json())
        .then(json => json.value[0])
        .then(rec => {
          return {
            id: rec.Id,
            caption: rec.rating,
            urlCaption: rec.show,
            tabs: [],
            view: views[0],
          }
        })
    },
  },
  Tab: () => undefined,
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
