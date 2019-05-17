import React from 'react';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';
import './graphiql.css';

const tenant = window.location.hash.substring(1);

function graphQLFetcher(graphQLParams) {
  return fetch('http://localhost:4444/graphql?tenant=' + tenant, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}



function App() {
  return (
    <div>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>
  );
}

export default App;
