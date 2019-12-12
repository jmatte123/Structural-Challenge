const rootQuery = require('../resolvers');
const typeDefs = require('../schema');
var { graphql } = require('graphql');

var query = `
  getPersonById(id: "24341d42-8235-47a1-9ec5-c6afcbdcef16"){
    firstName
  }
`;

var queryResult = `
{
    "data": {
      "getPersonById": {
        "firstName": "Ofelia"
    }
  }
`;

test('queries getDepartments', () => {
  var result = graphql(typeDefs, query, rootQuery).then((res) => {
    expect(res).toBe(queryResult);
  }).catch(err => {
    console.error(err);
  });
});
