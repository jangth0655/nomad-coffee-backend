import { gql } from "apollo-server";
export default gql`
  type Query {
    searchCoffeeShops(keyword: String!, page: Int): [CoffeeShop]
  }
`;
