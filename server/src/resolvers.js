const { MongoClient } = require('mongodb');

// TODO: refactor this to make it part of the context of the graphql
const MONGO_URL = `mongodb://mongo:27017`;
const dbName = `company`;
const client = new MongoClient(MONGO_URL, { useUnifiedTopology: true });
var db, peopleCollection, departmentsCollection;
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
        const departmentJSON = await departmentsCollection.findOne({ id: personJSON.departmentId });
        return new Department(departmentJSON.id, departmentJSON.name);
    }

    async manager() {
        const personJSON = await peopleCollection.findOne({ id: this.id });
        if (personJSON.managerId === undefined) return null;
        const managerJSON = await peopleCollection.findOne({ id: personJSON.managerId });
        return new Person(
            managerJSON.id, 
            managerJSON.firstName, 
            managerJSON.lastName, 
            managerJSON.jobTitle
        );
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

function mapJSONtoPersonArray(json) {
    return json.map((type) => {
        return new Person(
            type.id, 
            type.firstName, 
            type.lastName, 
            type.jobTitle
        );
    });
}

function mapJSONtoDepartmentArray(json) {
    return json.map((type) => {
        return new Department(type.id, type.name);
    });
}

const rootQuery = {
    getPeople: async () => {
        const peopleJSON = await peopleCollection.find({}).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    getPersonById: async ({ id }) => {
        const personJSON = await peopleCollection.findOne({ id });
        return new Person(
            personJSON.id, 
            personJSON.firstName, 
            personJSON.lastName, 
            personJSON.jobTitle
        );
    },
    getPersonByFirstName: async ({ firstName }) => {
        const peopleJSON = await peopleCollection.find({ firstName }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    getPersonByLastName: async ({ lastName }) => {
        const peopleJSON = await peopleCollection.find({ lastName }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    getPersonByFullName: async ({ firstName, lastName }) => {
        const peopleJSON = await peopleCollection.find({ firstName, lastName}).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    getPersonByJobTitle: async ({ jobTitle }) => {
        const peopleJSON = await peopleCollection.find({ jobTitle }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    getDepartments: async () => {
        const departmentsJSON = await departmentsCollection.find({}).toArray();
        return mapJSONtoDepartmentArray(departmentsJSON);
    },
    getDepartmentById: async ({ id }) => {
        const departmentJSON = await departmentsCollection.findOne({ id: id });
        return new Department(departmentJSON.id, departmentJSON.name);
    },
    getDepartmentByName: async ({ name }) => {
        const departmentsJSON = await departmentsCollection.find({ name }).toArray();
        return mapJSONtoDepartmentArray(departmentsJSON);
    },
    createPerson: async ({ input }) => {
        const jsonOutput = await peopleCollection.insertOne({ 
            id: input.id, 
            firstName: input.firstName,
            lastName: input.lastName,
            jobTitle: input.jobTitle,
            departmentId: input.departmentId,
            managerId: input.managerId
        });
        const newPersonJSON = jsonOutput.ops && jsonOutput.ops[0];
        return new Person(
            newPersonJSON.id, 
            newPersonJSON.firstName, 
            newPersonJSON.lastName, 
            newPersonJSON.jobTitle, 
            newPersonJSON.departmentId, 
            newPersonJSON.managerId
        );
    },
    createDepartment: async ({ input }) => {
        const jsonOutput = await departmentsCollection.insertOne({
            name: input.name,
            id: input.id
        });
        const newDepartmentJSON = jsonOutput.ops && jsonOutput.ops[0];
        return new Department(
            newDepartmentJSON.id,
            newDepartmentJSON.name
        );
    },
    updatePerson: async ({ id, input }) => {
        const jsonOutput = await peopleCollection.updateOne(
            { id: id },
            {$set: {
                id: input.id,
                firstName: input.firstName,
                lastName: input.lastName,
                jobTitle: input.jobTitle,
                departmentId: input.departmentId,
                managerId: input.managerId
            }}
        );
        console.log(jsonOutput);
        return new Person()
    }
}

module.exports = rootQuery;