const { gql } = require('apollo-server-cloud-functions')

const schema = gql`
  type Query {
    user(identifier: String!, identifierType: String!): User
    users(identifiers: [String!], identifierType: String!): [User]
  }
  type User {
      firstName: String
      lastName: String
      email: String
      uid: String
      friends: [String]
      passes: [Pass]
      canView: Boolean
  }
  type Pass {
      gymId: String
      number: Int
  }
`
// TODO Cache user? Or specific fields in user? For how long? https://www.apollographql.com/docs/apollo-server/performance/caching/

export default schema