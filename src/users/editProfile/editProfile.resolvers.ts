import { GraphQLUpload } from "graphql-upload";
import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import bcrypt from "bcrypt";
import { deleteToS3, uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Upload: GraphQLUpload as any,
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

        let fileUrl = undefined;
        if (avatarURL) {
          await deleteToS3(avatarURL, "avatar");
          fileUrl = await uploadToS3(avatarURL, loggedInUser.id, "avatar");
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
            avatarURL: fileUrl,
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
