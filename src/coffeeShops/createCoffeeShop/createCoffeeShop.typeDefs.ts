import { gql } from "apollo-server";
export default gql`
  type CreateCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createCoffeeShop(
      url: String
      latitude: String
      longitude: String
      payload: String
      name: String!
      categoryName: String!
    ): CreateCoffeeShopResult!
  }
`;
