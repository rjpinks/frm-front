import Taskbar from "./components/Taskbar";
import Splash from "./components/Splash";
// React imports
import { useState, useEffect } from "react";
// GraphQL imports
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, useQuery } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const url = "http://localhost:3001/graphql"
const httpLink = createHttpLink({ uri: url })

// JWT authorization code
const authLink = setContext((_, { headers }) => {
  // Check if running on the client side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  }

  // If running on the server side, return headers without modification
  console.log({ headers })
  return { headers };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// LOOK FOR LOCAL STORAGE
let local;
let localValue;
if (localStorage["id_token"]) {
  local = true;
  localValue = localStorage["id_token"]
} else {
  local = false;
}


export default function App() {
  // If there is a token in localStorage we go to User page.


  function renderPage() {
    if (local !== true) {
      return <Splash />
    } else {
      return <Taskbar />
    }
  }

  return (
    <ApolloProvider client={client}>
      <div>
        {renderPage()}
      </div>
    </ApolloProvider>
  );
}
