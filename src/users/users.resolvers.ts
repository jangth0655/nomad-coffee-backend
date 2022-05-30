import client from "../client";
import { Resolvers } from "../type";

const PAGE_SIZE = 3;
const resolvers: Resolvers = {
  User: {
    seeFollowings: ({ username }, { page = 1 }) =>
      client?.user
        .findFirst({
          where: {
            username,
          },
        })
        .followings({
          take: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
        }),
    seeFollowers: ({ username }, { page = 1 }) =>
      client.user
        .findFirst({
          where: {
            username,
          },
        })
        .followers({
          take: PAGE_SIZE,
          skip: (page - 1) * PAGE_SIZE,
        }),
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id;
    },
    isFollowing: async ({ id }, _, { loggedInUser }) => {
      if (!loggedInUser) {
        return false;
      }
      const exist = await client.user.count({
        where: {
          id: loggedInUser.id,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exist);
    },
  },
};

export default resolvers;
