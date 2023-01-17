import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { typeDefs, resolvers } from './schema';

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('connected to database');// eslint-disable-line
};

const startApolloServer = async () => {
  await apolloServer.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );
};

startApolloServer();

const server = app.listen(port, () => {
  connect();
  console.log(`API RUNNING AT : http://localhost:${port} :)`);// eslint-disable-line
});

export default server;
