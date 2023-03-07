import React from 'react';
import App from './App';
// import ApolloClient from 'apollo-client';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
// import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
// import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';

const linkHttp = new createHttpLink({
    // uri: 'http://localhost:5000',
    // uri: 'https://graphql-server-20210716.herokuapp.com/',
    uri: process.env.REACT_APP_URI,
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    };
});

// const client = new ApolloClient({
//     link: authLink.concat(linkHttp),
//     cache: new InMemoryCache(),
//     onError: ({ networkError, graphQLErrors }) => {
//         console.log('graphQLErrors', graphQLErrors);
//         console.log('networkError', networkError);
//     },
// });

const client = new ApolloClient({
    // uri: "http://localhost:4000",
    // uri: "http://localhost:5000",
    uri: "https://graphql-server-production-9561.up.railway.app/",
    cache: new InMemoryCache(),
});

export default (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
);
