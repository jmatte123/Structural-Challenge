const { gql } = require('apollo-server');

var typeDefs = gql`
    type Person {
        id: String!
        firstName: String!
        lastName: String!
        jobTitle: String!
        department: Department!
        manager: Person
    }

    type Department {
        name: String!
        id: String!
        people: [Person]
    }

    input PersonInput {
        id: ID!
        firstName: String!
        lastName: String!
        jobTitle: String!
        departmentId: String!
        managerId: String
    }

    input DepartmentInput {
        name: String!
        id: ID!
    }
    
    type Query {
        # Get all of the people in the company
        getPeople: [Person]

        # Get a person by their ID
        getPersonById(id: ID): Person

        # Get a person by their first name
        getPersonByFirstName(firstName: String): [Person]

        # Get a person by their last name
        getPersonByLastName(lastName: String): [Person]
        
        # Get a person by their full name
        getPersonByFullName(firstName: String, lastName: String): [Person]

        # Get a person by their job title
        getPersonByJobTitle(jobType: String): [Person]

        # Get all of the Departments in the company
        getDepartments: [Department]

        # Get a department of the company by its ID
        getDepartmentById(id: ID): Department

        # get the departments of the company by their name
        getDepartmentByName(name: String): [Department]
    }

    type Mutation {
        createPerson(input: PersonInput!): Person
        createDepartment(input: DepartmentInput!): Department
        updatePerson(id: String!, input: PersonInput!): Person
    }
`;

module.exports = typeDefs;