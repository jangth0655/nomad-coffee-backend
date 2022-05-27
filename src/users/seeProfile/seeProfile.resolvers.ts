import client from "../../client";
import { Resolvers } from "../../type";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }) => {
      const user = await client.user.findFirst({
        where: {
          username,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "Not found user.",
        };
      }
      return {
        ok: true,
        user,
      };
    },
  },
};

export default resolvers;
