import { ApolloServer } from 'apollo-server';
import express from 'express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  context: ({ req, res }) => ({ req, res }),
});

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('connected to database');// eslint-disable-line
  
};

server.listen({ port }).then(({ url }) => {
  connect();
  console.log(`API RUNNING AT : ${url} :)`);// eslint-disable-line
});
