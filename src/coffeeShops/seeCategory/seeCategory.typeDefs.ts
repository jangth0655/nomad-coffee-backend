import { gql } from "apollo-server";
export default gql`
  type CategoryResult {
    ok: Boolean!
    error: String
    shops: [CoffeeShop]
  }
  type Query {
    seeCategory(categoryName: String!, page: Int): CategoryResult
  }
`;
4;
