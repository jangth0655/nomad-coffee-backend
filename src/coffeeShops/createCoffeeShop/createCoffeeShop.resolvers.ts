import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import { processSlug } from "../coffeeShops.utls";

const resolver: Resolvers = {
  Mutation: {
    createCoffeeShop: protectResolver(
      async (
        _,
        { url, name, latitude, longitude, payload, categoryName },
        { loggedInUser, client }
      ) => {
        const existShop = await client?.coffeeShop.findFirst({
          where: {
            name,
          },
          select: {
            id: true,
          },
        });
        if (existShop) {
          return {
            ok: false,
            error: "That name already taken.",
          };
        }

        const newSlug = processSlug(categoryName, name);
        console.log(newSlug);
        const shop = await client?.coffeeShop.create({
          data: {
            payload,
            name,
            slug: newSlug,
            latitude,
            longitude,
            categories: {
              connectOrCreate: {
                where: {
                  slug: newSlug,
                },
                create: {
                  name: categoryName,
                  slug: newSlug,
                },
              },
            },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
        if (shop && url) {
          await client?.coffeeShopPhoto.create({
            data: {
              url,
              shop: {
                connect: {
                  id: shop.id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
