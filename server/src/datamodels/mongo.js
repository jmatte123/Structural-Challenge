const { MongoClient } = require('mongodb');

const MONGO_URL = `mongodb://mongo:27017`;
const dbName = `company`;
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
client.connect().then((client) => {
    //console.log('Connected to MongoDB');
    db = client.db(dbName);
    global.peopleCollection = db.collection('people');
    global.departmentsCollection = db.collection('departments');
});