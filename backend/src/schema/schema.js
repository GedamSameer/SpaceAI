const typeDefs = `#graphql
  type Employee {
    id: ID!
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Department {
    id: ID!
    name: String!
    floor: String!
  }

  input EmployeeInput {
    name: String!
    position: String!
    department: String!
    salary: Float!
  }

  type Query {
    getAllEmployees: [Employee!]!
    getEmployeeDetails(id: ID!): Employee
    getEmployeesByDepartment(department: String!): [Employee!]!
    getDepartments: [Department!]!
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee!
  }
`;

module.exports = typeDefs;