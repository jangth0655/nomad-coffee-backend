import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import { processSlug } from "../coffeeShops.utls";

const resolvers: Resolvers = {
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, payload, latitude, longitude, photos, categoryName },
        { client, loggedInUser }
      ) => {
        const existCoffeeShop = await client?.coffeeShop.findFirst({
          where: {
            id,
            userId: loggedInUser.id,
          },
          select: {
            id: true,
            slug: true,
            name: true,
          },
        });
        if (!existCoffeeShop) {
          return {
            ok: false,
            error: "Could not found CoffeeShop.",
          };
        }

        if (name) {
          const confirmName = await client?.coffeeShop.findFirst({
            where: {
              name,
            },
            select: {
              id: true,
            },
          });

          if (confirmName) {
            return {
              ok: false,
              error: "That name already taken.",
            };
          }
        }

        let newSlug = undefined;
        const existCategoryName = existCoffeeShop.slug.split("-")[0];
        const existCategory = name === existCoffeeShop.name && !categoryName;
        name = name ? name : existCoffeeShop.name;
        const newCategoryName = categoryName ? categoryName : existCategoryName;

        newSlug = processSlug(newCategoryName, name);

        if (photos) {
        }

        await client?.coffeeShop.update({
          where: {
            id: existCoffeeShop.id,
          },
          data: {
            name,
            payload,
            latitude,
            longitude,
            photos,
            slug: name ? newSlug : existCoffeeShop.slug,
            categories: existCategory
              ? {}
              : {
                  delete: {
                    slug: existCoffeeShop.slug,
                  },
                  disconnect: {
                    slug: existCoffeeShop.slug,
                  },
                  connectOrCreate: {
                    where: {
                      slug: newSlug,
                    },
                    create: {
                      slug: newSlug,
                      name: categoryName ? categoryName : existCategoryName,
                    },
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
