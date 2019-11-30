const {MongoClient, ObjectId} = require('mongodb');


// TODO: refactor this to make it part of the context of the graphql
const MONGO_URL = 'mongodb://localhost:27017';
const dbName = 'company';
const client = new MongoClient(MONGO_URL);
var db, People, Departments;
client.connect().then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    People = db.collection('people');
    Departments = db.collection('departments');
});

class Person {
    constructor(id, firstName, lastName, jobTitle) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
    }

    async department() {
        const personJSON = await People.findOne({ id: this.id });
        const departmentJSON = await Departments.findOne({ id: personJSON.departmentId });
        return new Department(departmentJSON.id, departmentJSON.name);
    }

    async manager() {
        var personJSON = await People.findOne({ id: this.id });
        personJSON ? personJSON : return null;
        const managerJSON = await People.findOne({ id: personJSON.managerId });
        return new Person(managerJSON.id, managerJSON.firstName, managerJSON.lastName, managerJSON.jobTitle);
    }
}

class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async person() {

    }
}

const rootQuery = {
    getPeople: async () => {
        const people = await People.find({}).toArray();
        return people.map((person) => {
            return new Person(person.id, person.firstName, person.lastName, person.jobTitle);
        });
    },
    getPerson: async ({ id }) => {
        const personJSON = await People.findOne({ id: id });
        return new Person(personJSON.id, personJSON.firstName, personJSON.lastName, personJSON.jobTitle);
    }
}

module.exports = rootQuery;