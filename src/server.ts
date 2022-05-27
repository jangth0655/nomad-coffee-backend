import "dotenv/config";
import express from "express";
import http from "http";
import client from "./client";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";

import { resolvers, typeDefs } from "./schema";
import { getUser } from "./user.utils";

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (ctx: any) => {
      return {
        loggedInUser: await getUser(ctx.req.headers.token as string),
        client,
      };
    },
  });

  app.use(logger("tiny"));

  await apollo.start();
  apollo.applyMiddleware({ app, path: "/" });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${apollo.graphqlPath}`
  );
}

startApolloServer();
