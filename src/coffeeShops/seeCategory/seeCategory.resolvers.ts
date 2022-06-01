import { Resolvers } from "../../type";

const PAGE_SIZE = 3;
const resolvers: Resolvers = {
  Query: {
    seeCategory: async (_, { categoryName, page = 1 }, { client }) => {
      const existCategory = await client?.category.findFirst({
        where: {
          name: categoryName,
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (!existCategory) {
        return {
          ok: false,
          error: "Could not found Category",
        };
      }
      const shops = await client?.coffeeShop.findMany({
        where: {
          categories: {
            some: {
              name: existCategory.name,
            },
          },
        },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
      });

      return {
        ok: true,
        shops,
      };
    },
  },
};

export default resolvers;
