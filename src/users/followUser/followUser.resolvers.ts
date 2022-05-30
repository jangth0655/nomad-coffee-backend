import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectResolver(
      async (_, { username }, { loggedInUser, client }) => {
        const existingUser = await client?.user.findFirst({
          where: {
            username,
          },
          select: {
            id: true,
          },
        });
        if (!existingUser) {
          return {
            ok: false,
            error: "That user does not exist.",
          };
        }
        await client?.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            followings: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolvers;
