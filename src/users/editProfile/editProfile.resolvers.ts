import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import bcrypt from "bcrypt";

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          username,
          email,
          name,
          location,
          password: newPassword,
          avatarURL,
          githubUsername,
        },
        { loggedInUser, client }
      ) => {
        let hashPassword = null;
        if (newPassword) {
          hashPassword = await bcrypt.hash(newPassword, 10);
        }

        const updateUser = await client?.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            username,
            email,
            name,
            location,
            ...(hashPassword && { password: hashPassword }),
            avatarURL,
            githubUsername,
          },
        });
        if (updateUser?.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Could not update profile.",
          };
        }
      }
    ),
  },
};

export default resolvers;
