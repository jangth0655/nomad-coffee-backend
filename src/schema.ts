const path = require("path");
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
