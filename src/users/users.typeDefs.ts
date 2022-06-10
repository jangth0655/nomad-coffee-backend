import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    createdAt: String!
    updatedAt: String!
    username: String!
    email: String!
    name: String!
    location: String
    password: String!
    avatarURL: String
    githubUsername: String
    seeFollowings(page: Int): [User]!
    seeFollowers(page: Int): [User]!
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
    userCoffeeShops: CoffeeShop
  }
`;
