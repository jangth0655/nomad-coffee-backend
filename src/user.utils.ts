import jwt from "jsonwebtoken";
import client from "./client";
import { Context, Resolver } from "./type";

type Token = {
  id: number;
};

export const getUser = async (token: string) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = (await jwt.verify(token, process.env.SECRET_KEY!)) as Token;
    const user = await client.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return null;
    } else {
      return user;
    }
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const protectResolver =
  (resolver: Resolver) =>
  (root: any, args: any, context: Context, info: any) => {
    if (!context.loggedInUser) {
      return {
        ok: false,
        error: "Please Log in",
      };
    }
    return resolver(root, args, context, info);
  };
