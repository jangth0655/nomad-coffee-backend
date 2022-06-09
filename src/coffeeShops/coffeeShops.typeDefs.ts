import { gql } from "apollo-server";

export default gql`
  type CoffeeShopPhoto {
    id: Int!
    url: String!
    shop: [CoffeeShop]
  }

  type CoffeeShop {
    id: Int!
    slug: String!
    name: String!
    payload: String
    latitude: String
    longitude: String
    categories: [Category]!
    photos(page: Int): [CoffeeShopPhoto]
    user: User
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    shops: [CoffeeShop]!
    totalShops: Int!
  }
`;
