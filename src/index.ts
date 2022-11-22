import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import cors from 'cors';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
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
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  // console.log('connected to database');// eslint-disable-line
};

const startApolloServer = async () => {
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    }),
  );
};

startApolloServer();

app.listen(port, () => {
  connect();
  // console.log(`API RUNNING AT : http://localhost:${port} :)`);// eslint-disable-line
});

export default app;
