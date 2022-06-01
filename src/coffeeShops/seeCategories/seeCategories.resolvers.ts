import { Resolvers } from "../../type";

const PAGE_SIZE = 10;
const resolvers: Resolvers = {
  Query: {
    seeCategories: (_, { page = 1 }, { client }) =>
      client?.category.findMany({
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      }),
  },
};

export default resolvers;
