import { gql } from "apollo-server";

export default gql`
  scalar Upload

  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      url: Upload
      latitude: String
      longitude: String
      payload: String
      name: String!
      categoryName: String!
    ): CreateCoffeeShopResult!
  }
`;
