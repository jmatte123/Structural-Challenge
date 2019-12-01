const express = require('express');
const graphqlHTTP = require('express-graphql');
const logger = require('morgan');
const rootQuery = require('./resolvers');
const typeDefs = require('./schema');

var app = express();
//app.use(logger('dev'));

app.use('/', graphqlHTTP({
    schema: typeDefs,
    rootValue: rootQuery,
    graphiql: false
}));

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});