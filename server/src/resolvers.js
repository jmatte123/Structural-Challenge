const {MongoClient, ObjectId} = require('mongodb');

const MONGO_URL = 'mongodb://localhost:27017';
const dbName = 'company';
const client = new MongoClient(MONGO_URL);
var db, People;
client.connect().then((client) => {
    console.log('Connected to MongoDB');
    db = client.db('company');
    People = db.collection('people');
});
//const Departments = db.getCollection('departments');

const resolvers = {
    Query: {
        getPeople: async () => {
            return await People.find({}).toArray();
        }
    }
}

module.exports = resolvers;