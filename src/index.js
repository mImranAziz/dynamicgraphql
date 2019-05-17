const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')
const qs = require('querystring')
var request = require("request");

const v6url = 'http://torwdiaziz01/devlogin/iadevform/api/v2/object';
const custObject = 'Eee_graphqlObject';
const authHeader = 'Basic SU5URUxFWFxBZG1pbmlzdHJhdG9yOkFkbWluaXN0cmF0b3I=';


const getObjectData = (entity, options) => {
  let url = `${v6url}/${entity}`;
  if (options) {
    url += '?' + qs.stringify(options)
  }
  return fetch(url, {
    headers: {
      Authorization: authHeader,
    },
  })
}

const getMyTasks = () => {
  let url = 'http://torwdiaziz01/devlogin/iadevform/api/v2/task/mytasks';
  return fetch(url, {
    headers: {
      Authorization: authHeader,
    },
  })
}

const createObjectData = (entity, jsonBody) => {
  var options = { 
    method: 'POST',
    url: `${v6url}/${entity}`,
    headers: { 
      'content-type': 'application/json', 
      Authorization: authHeader,

    },
    body: jsonBody,
    json: true 
  };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
  })
}

const updateObjectData = (id, entity, jsonBody) => {
  var options = { 
    method: 'PATCH',
    url: `${v6url}/${entity}(${id})`,
    headers: { 
      'content-type': 'application/json', 
      Authorization: authHeader,

    },
    body: jsonBody,
    json: true 
  };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
  })
}

const resolvers = {
  Query: {
    Object: (a, { name }) => {
      return getObjectData(custObject)
        .then(res => res.json())
        .then(json => json.value)
        .then(rec => {
          return rec;
        })
    },
    Task: (a, { name }) => {
      return getMyTasks()
        .then(res => res.json())
        .then(json => json.value)
        .then(rec => {
          return rec;
        })
    },

  },
  Mutation: {
    createCustomObject: (args) => {
      const record = {
        show: args.show,
        rating: args.rating,
      }
   
      return createObjectData(custObject, record);
    },
    updateCustomObject: (Id, args) => {
      const record = {
        show: args.show,
        rating: args.rating,
      }
   
      return updateObjectData(args.Id, custObject, record);
    },
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
