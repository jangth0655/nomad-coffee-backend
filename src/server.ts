import "dotenv/config";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { resolvers, typeDefs } from "./schema";

const PORT = process.env.PORT;

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
  });

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
