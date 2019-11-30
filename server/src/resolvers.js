const {MongoClient} = require('mongodb');

// TODO: refactor this to make it part of the context of the graphql
const MONGO_URL = 'mongodb://localhost:27017';
const dbName = 'company';
const client = new MongoClient(MONGO_URL);
var db, People, Departments;
client.connect().then((client) => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
    peopleCollection = db.collection('people');
    departmentsCollection = db.collection('departments');
});

class Person {
    constructor(id, firstName, lastName, jobTitle) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
    }

    async department() {
        const personJSON = await peopleCollection.findOne({ id: this.id });
        const departmentJSON = await DepartmentsCollection.findOne({ id: personJSON.departmentId });
        return new Department(departmentJSON.id, departmentJSON.name);
    }

    async manager() {
        const personJSON = await peopleCollection.findOne({ id: this.id });
        if (personJSON.managerId === undefined) return null;
        const managerJSON = await peopleCollection.findOne({ id: personJSON.managerId });
        return new Person(managerJSON.id, managerJSON.firstName, managerJSON.lastName, managerJSON.jobTitle);
    }
}

class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async people() {
        const peopleJSON = await peopleCollection.find({ departmentId: this.id }).toArray();
        return peopleJSON.map((person) => {
            return new Person(person.id, person.firstName, person.lastName, person.jobTitle);
        });
    }
}

const rootQuery = {
    getPeople: async () => {
        const peopleJSON = await peopleCollection.find({}).toArray();
        return peopleJSON.map((person) => {
            return new Person(person.id, person.firstName, person.lastName, person.jobTitle);
        });
    },
    getPersonById: async ({ id }) => {
        const personJSON = await peopleCollection.findOne({ id: id });
        return new Person(personJSON.id, personJSON.firstName, personJSON.lastName, personJSON.jobTitle);
    },
    getPersonByFirstName: async () => {

    },
    getPersonByLastName: async () => {

    },
    getPersonByFullName: async () => {

    },
    getPersonByJobTitle: async () => {

    },
    getDepartments: async () => {
        const departmentsJSON = await departmentsCollection.find({}).toArray();
        return departmentsJSON.map((department) => {
            return new Department(department.id, department.name);
        });
    },
    getDepartmentById: async ({ id }) => {
        const departmentJSON = await departmentsCollection.findOne({ id: id });
        return new Department(departmentJSON.id, departmentJSON.name);
    },
    getDepartmentByName: async () => {
        
    }
}

module.exports = rootQuery;