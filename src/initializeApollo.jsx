import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import firebase from 'firebase/app'
// import 'firebase/auth'

let functionsGraphQLUri
if (window.location.hostname === "localhost") {
  functionsGraphQLUri = `http://localhost:5001/climbing-pass-wallet/us-central1/graphql`
} else {
  functionsGraphQLUri = `https://asia-east2-${process.env.REACT_APP_FIREBASE_projectId}.cloudfunctions.net/graphql`
}

const httpLink = createHttpLink({
  uri: functionsGraphQLUri,
})

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

// const client = new ApolloClient({
//   uri: functionsGraphQLUri,
//   cache: new InMemoryCache()
// })

export default client
