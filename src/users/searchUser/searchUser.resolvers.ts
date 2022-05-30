import { Resolvers } from "../../type";

const PAGE_SIZE = 5;
const resolvers: Resolvers = {
  Query: {
    searchUser: async (_, { keyword, page = 1 }, { loggedInUser, client }) => {
      const users = await client?.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      });
      return users;
    },
  },
};

export default resolvers;
