import { Resolvers } from "../../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { page = 1 }, { client }) =>
      client?.coffeeShop.findMany({
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
  },
};

export default resolvers;
