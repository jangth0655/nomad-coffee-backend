import { GraphQLUpload } from "graphql-upload";
import { deleteToS3, uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import { processSlug } from "../coffeeShops.utls";

const resolvers: Resolvers = {
  Upload: GraphQLUpload as any,
  Mutation: {
    editCoffeeShop: protectResolver(
      async (
        _,
        { id, name, payload, latitude, longitude, url, categoryName, photoId },
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

        let updatedPhotoUrl = undefined;
        if (url && photoId) {
          await deleteToS3(url, "upload");
          updatedPhotoUrl = await uploadToS3(url, loggedInUser.id, "upload");
          await client?.coffeeShopPhoto.update({
            where: { id: photoId },
            data: { url: updatedPhotoUrl },
          });
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
