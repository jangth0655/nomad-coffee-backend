import { gql } from "apollo-server";
export default gql`
  scalar Upload
  type EditCoffeeShopResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editCoffeeShop(
      id: Int!
      name: String
      payload: String
      latitude: String
      longitude: String
      url: Upload
      categoryName: String
      photoId: Int
    ): EditCoffeeShopResult!
  }
`;
