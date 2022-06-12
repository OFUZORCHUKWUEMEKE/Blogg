import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  createHttpLink,
} from "@apollo/client";
import { setContext } from 'apollo-link-context';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProvider } from "./AuthProvider";
import EditorProvider from "./Editor/EditorProvider";

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});


export default (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <EditorProvider>
          <Router>
            <App />
          </Router>
        </EditorProvider>
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
)