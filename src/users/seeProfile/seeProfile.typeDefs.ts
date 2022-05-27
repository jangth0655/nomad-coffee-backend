import { gql } from "apollo-server";
export default gql`
  type SeeProfileResponse {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(username: String!): SeeProfileResponse
  }
`;
