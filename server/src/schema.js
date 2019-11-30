const { buildSchema } = require('graphql');

var typeDefs = buildSchema(`
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
    
    type Query {
        getPeople: [Person]
        getPerson(id: String!): Person
    }
`);

module.exports = typeDefs;