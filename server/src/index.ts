import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { ApolloServer } from "apollo-server-express";
import { connectDatabase } from "./database";
import { typeDefs, resolvers } from "./graphql";

const mount = async (app: Application) => {
  try {
    const db = await connectDatabase();
    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env.PORT);
    console.log(`[app]: http://localhost:${process.env.PORT}`);
  } catch (error) {
    throw new Error(`[app]: Cannot connect to the database:  ${error}`);
  }
};

mount(express());
