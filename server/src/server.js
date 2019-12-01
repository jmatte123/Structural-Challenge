const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { MongoClient } = require('mongodb');

const MongodbAPI = require('./datasources/mongo');

const MONGO_URL = `mongodb://localhost:27017`;
const dbName = `company`;
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
var db, peopleCollection, departmentsCollection;
client.connect().then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        dataSources: () => ({
          mongodbAPI: new MongodbAPI(db),
        })
      });
    
    server.listen().then(({ url }) => {
        console.log(`Server ready at ${url}`);
    });
});