const { buildSchema } = require('graphql');

var typeDefs = buildSchema(`
    type Person {
        id: String!
        firstName: String!
        lastName: String!
        jobTitle: String!
        department(id: String!): Department!
        manager(id: String!): Person
    }

    type Department {
        name: String!
        id: String!
    }
    
    type Query {
        getPeople: [Person]
    }
`);

module.exports = typeDefs;