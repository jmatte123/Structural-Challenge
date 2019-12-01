const Person = require('./models/person');
const Department = require('./models/department');

// function mapJSONtoPersonArray(json) {
//     return json.map((type) => {
//         return new Person(
//             type.id, 
//             type.firstName, 
//             type.lastName, 
//             type.jobTitle
//         );
//     });
// }

// function mapJSONtoDepartmentArray(json) {
//     return json.map((type) => {
//         return new Department(type.id, type.name);
//     });
// }

module.exports = {
    Query: {
        getPeople: async (_, __, { dataSources }) => {
            return await dataSources.mongodbAPI.peopleCollection.find({}).toArray();
        },
    //     getPersonById: async (_, { id }, { dataSources }) => {
    //         const personJSON = await peopleCollection.findOne({ id });
    //         return new Person(
    //             personJSON.id, 
    //             personJSON.firstName, 
    //             personJSON.lastName, 
    //             personJSON.jobTitle
    //         );
    //     },
    //     getPersonByFirstName: async (_, { firstName }, { dataSources }) => {
    //         const peopleJSON = await peopleCollection.find({ firstName }).toArray();
    //         return mapJSONtoPersonArray(peopleJSON);
    //     },
    //     getPersonByLastName: async (_, { lastName }, { dataSources }) => {
    //         const peopleJSON = await peopleCollection.find({ lastName }).toArray();
    //         return mapJSONtoPersonArray(peopleJSON);
    //     },
    //     getPersonByFullName: async (_, { firstName, lastName }, { dataSources }) => {
    //         const peopleJSON = await peopleCollection.find({ firstName, lastName}).toArray();
    //         return mapJSONtoPersonArray(peopleJSON);
    //     },
    //     getPersonByJobTitle: async ({ jobTitle }) => {
    //         const peopleJSON = await peopleCollection.find({ jobTitle }).toArray();
    //         return mapJSONtoPersonArray(peopleJSON);
    //     },
    //     getDepartments: async () => {
    //         const departmentsJSON = await departmentsCollection.find({}).toArray();
    //         return mapJSONtoDepartmentArray(departmentsJSON);
    //     },
    //     getDepartmentById: async ({ id }) => {
    //         const departmentJSON = await departmentsCollection.findOne({ id: id });
    //         return new Department(departmentJSON.id, departmentJSON.name);
    //     },
    //     getDepartmentByName: async ({ name }) => {
    //         const departmentsJSON = await departmentsCollection.find({ name }).toArray();
    //         return mapJSONtoDepartmentArray(departmentsJSON);
    //     },
    // },
    // Mutation: {
    //     createPerson: async ({ input }) => {
    //         const jsonOutput = await peopleCollection.insertOne({ 
    //             id: input.id, 
    //             firstName: input.firstName,
    //             lastName: input.lastName,
    //             jobTitle: input.jobTitle,
    //             departmentId: input.departmentId,
    //             managerId: input.managerId
    //         });
    //         const newPersonJSON = jsonOutput.ops && jsonOutput.ops[0];
    //         return new Person(
    //             newPersonJSON.id, 
    //             newPersonJSON.firstName, 
    //             newPersonJSON.lastName, 
    //             newPersonJSON.jobTitle, 
    //             newPersonJSON.departmentId, 
    //             newPersonJSON.managerId
    //         );
    //     },
    //     createDepartment: async ({ input }) => {
    //         const jsonOutput = await departmentsCollection.insertOne({
    //             name: input.name,
    //             id: input.id
    //         });
    //         const newDepartmentJSON = jsonOutput.ops && jsonOutput.ops[0];
    //         return new Department(
    //             newDepartmentJSON.id,
    //             newDepartmentJSON.name
    //         );
    //     },
    //     updatePerson: async ({ id, input }) => {
    //         const jsonOutput = await peopleCollection.updateOne(
    //             { id: id },
    //             {$set: {
    //                 id: input.id,
    //                 firstName: input.firstName,
    //                 lastName: input.lastName,
    //                 jobTitle: input.jobTitle,
    //                 departmentId: input.departmentId,
    //                 managerId: input.managerId
    //             }}
    //         );
    //         console.log(jsonOutput);
    //         return new Person()
    //     }

    },
    Person: {
        department: async (person, __, { dataSources }) => {
            console.log(person)
            const personJSON = await dataSources.mongodbAPI.peopleCollection.findOne({ id: person.id });
            console.log(personJSON.departmentId);
            return await dataSources.mongodbAPI.departmentsCollection.findOne({ id: personJSON.departmentId });
        },
        manager: async (_, __, { dataSources }) => {
            const personJSON = await dataSources.mongodbAPI.peopleCollection.findOne({ id: this.id });
            if (personJSON.managerId === undefined) return null;
            return await dataSources.mongodbAPI.peopleCollection.findOne({ id: personJSON.managerId });
        }  
    }
}