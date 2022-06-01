import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeCoffeeShop: (_, { id }, { client }) =>
      client?.coffeeShop.findUnique({
        where: {
          id,
        },
      }),
  },
};

export default resolvers;
