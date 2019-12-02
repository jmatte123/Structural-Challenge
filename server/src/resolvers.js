const Person = require('./models/person');
const Department = require('./models/department');

/**
 * This is a nice helper method that maps a json array of people to an actual array of People.
 * 
 * @param json - this is the json array that we want to turn into an array of People. 
 * @returns - an array of Person's.
 */
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

/**
 * Transforms list of json deparments to a list department objects.
 * 
 * @param json - the json list of departments
 * @returns - an array of Departments
 */
function mapJSONtoDepartmentArray(json) {
    return json.map((type) => {
        return new Department(type.id, type.name);
    });
}

/**
 * This is the root query for GraphQL. It is a big list of resolvers
 * where we define how the queries are linked to the data base.  This
 * then corresponds to our GraphQL schema specified in the other file.
 */
const rootQuery = {
    // Get all the people in our database
    getPeople: async () => {
        const peopleJSON = await global.peopleCollection.find({}).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    // Get a person by their id
    getPersonById: async ({ id }) => {
        const personJSON = await global.peopleCollection.findOne({ id });
        return new Person(
            personJSON.id, 
            personJSON.firstName, 
            personJSON.lastName, 
            personJSON.jobTitle
        );
    },
    // Get all the people with the given firstname
    getPersonByFirstName: async ({ firstName }) => {
        const peopleJSON = await global.peopleCollection.find({ firstName }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    // Get all the people with the given lastName
    getPersonByLastName: async ({ lastName }) => {
        const peopleJSON = await global.peopleCollection.find({ lastName }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    // Get all the people with the given fullname
    getPersonByFullName: async ({ firstName, lastName }) => {
        const peopleJSON = await global.peopleCollection.find({ firstName, lastName}).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    // Get all the people with the given jobTitle
    getPersonByJobTitle: async ({ jobTitle }) => {
        const peopleJSON = await global.peopleCollection.find({ jobTitle }).toArray();
        return mapJSONtoPersonArray(peopleJSON);
    },
    // Get all the deparmtents in our database
    getDepartments: async () => {
        const departmentsJSON = await global.departmentsCollection.find({}).toArray();
        return mapJSONtoDepartmentArray(departmentsJSON);
    },
    // Get a department by their id
    getDepartmentById: async ({ id }) => {
        const departmentJSON = await global.departmentsCollection.findOne({ id: id });
        return new Department(departmentJSON.id, departmentJSON.name);
    },
    // Get all the departments by the given name
    getDepartmentByName: async ({ name }) => {
        const departmentsJSON = await global.departmentsCollection.find({ name }).toArray();
        return mapJSONtoDepartmentArray(departmentsJSON);
    },
    // Create a person and put it into the Database
    createPerson: async ({ input }) => {
        // TODO: verify the id, departmentId, and managerId is not already in the database
        const jsonOutput = await global.peopleCollection.insertOne({ 
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
            newPersonJSON.jobTitle
        );
    },
    // create a department and put it into the database
    createDepartment: async ({ input }) => {
        // TODO: verify the id is not already in the database
        const jsonOutput = await global.departmentsCollection.insertOne({
            name: input.name,
            id: input.id
        });
        const newDepartmentJSON = jsonOutput.ops && jsonOutput.ops[0];
        return new Department(
            newDepartmentJSON.id,
            newDepartmentJSON.name
        );
    },
    // update a person in the database based on a given id and return the old person.
    updatePerson: async ({ id, input }) => {
        // TODO: verify the input data with pre-existing data
        const personJSON = await global.peopleCollection.findOne({ id });
        const jsonOutput = await global.peopleCollection.updateOne(
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
        // return the old person
        return new Person(
            personJSON.id,
            personJSON.firstName,
            personJSON.lastName,
            personJSON.jobTitle
        );
    }
}

module.exports = rootQuery;