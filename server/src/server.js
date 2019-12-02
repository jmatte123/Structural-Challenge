const express = require('express');
const graphqlHTTP = require('express-graphql');
const rootQuery = require('./resolvers');
const typeDefs = require('./schema');
const db = require('./datamodels/mongo');

var app = express();

/**
 * create our GraphQL API based on the schema and rootQuery.
 */
app.use('/', graphqlHTTP({
    schema: typeDefs,
    rootValue: rootQuery,
    graphiql: true
}));

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});