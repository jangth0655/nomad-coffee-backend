import { GraphQLUpload } from "graphql-upload";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../type";
import { protectResolver } from "../../user.utils";
import { processSlug } from "../coffeeShops.utls";

const resolver: Resolvers = {
  Upload: GraphQLUpload as any,
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

        const fileUrl = await uploadToS3(url, loggedInUser.id, "upload");

        const newSlug = processSlug(categoryName, name);

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
              url: fileUrl,
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
