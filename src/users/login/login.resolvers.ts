import client from "../../client";
import { Resolvers } from "../../type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({
        where: {
          username,
        },
        select: {
          id: true,
          username: true,
          password: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "Password or Username is incorrect.",
        };
      }
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "You write incorrect password or username.",
        };
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!);
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
