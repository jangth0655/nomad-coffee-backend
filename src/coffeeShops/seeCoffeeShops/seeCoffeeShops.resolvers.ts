import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShops: (_, { offset }, { client }) =>
      client?.coffeeShop.findMany({
        take: 2,
        skip: offset,
      }),
  },
};

export default resolvers;
