import client from "../client";
import { Resolvers } from "../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  CoffeeShop: {
    photos: ({ id }, { page = 1 }) =>
      client.coffeeShopPhoto.findMany({
        where: {
          shop: {
            id,
          },
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
    user: ({ userId }, _, { client }) =>
      client?.user.findUnique({
        where: {
          id: userId,
        },
      }),
  },
  Category: {
    totalShops: async ({ name }, {}, { client }) => {
      return await client?.coffeeShop.count({
        where: {
          categories: {
            some: {
              name,
            },
          },
        },
      });
    },
  },
};

export default resolvers;
