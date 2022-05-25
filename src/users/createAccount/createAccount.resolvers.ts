import bcrypt from "bcrypt";
import client from "../../client";

const resolvers = {
  Mutation: {
    createAccount: async (
      _: any,
      { username, password, email, name, location, githubUsername }: any
    ) => {
      const existUser = await client.user.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              username,
            },
          ],
        },
        select: {
          id: true,
        },
      });
      if (existUser) {
        return {
          ok: false,
          error: "Username or Email is already taken.",
        };
      }
      const uglyPassword = await bcrypt.hash(password, 10);
      await client.user.create({
        data: {
          username,
          password: uglyPassword,
          name,
          email,
          location,
          githubUsername,
        },
      });
      return {
        ok: true,
      };
    },
  },
};

export default resolvers;
