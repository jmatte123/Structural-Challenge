const rootQuery = require('../resolvers');
const typeDefs = require('../schema');
var { graphql } = require('graphql');
var { test } = require('jest');

var query = `
query person{
    getPersonById(id: "24341d42-8235-47a1-9ec5-c6afcbdcef16"){
      firstName
      lastName
      jobTitle
      manager{
        id
        lastName
      }
      department{
        id
      }
    }
  }
`;

var queryResult = `
{
    "data": {
      "getPersonById": {
        "firstName": "Ofelia",
        "lastName": "Buckridge",
        "jobTitle": "Direct Applications Architect",
        "manager": {
          "id": "d44390cd-b306-4e11-b7d5-a5e0e6fe1e3d",
          "lastName": "Streich"
        },
        "department": {
          "id": "cfd90465-28fa-4b9a-be3e-ef2517e987e9"
        }
      }
    }
  }
`;

test('queries getDepartments', () => {
    expect(graphql(typeDefs, query, rootQuery)).toBe(queryResult);
});
