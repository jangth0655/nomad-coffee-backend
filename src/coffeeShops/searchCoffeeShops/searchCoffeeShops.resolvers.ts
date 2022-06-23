import { Resolvers } from "../../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  Query: {
    searchCoffeeShops: async (_, { keyword, page = 1 }, { client }) => {
      const coffeeShops = await client?.coffeeShop.findMany({
        where: {
          OR: [
            {
              name: {
                startsWith: keyword.toLowerCase(),
              },
            },
            {
              categories: {
                some: {
                  name: keyword.toLowerCase(),
                },
              },
            },
          ],
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      });
      return coffeeShops;
    },
  },
};

export default resolvers;
