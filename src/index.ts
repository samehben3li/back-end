import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as path from 'path';
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
app.use('/assets', express.static(path.join(__dirname, '/assets')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('connected to database');// eslint-disable-line
};

/* const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
}; */

const startApolloServer = async () => {
  await server.start();
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ req }),
    }),
  );
};

startApolloServer();

app.listen(port, () => {
  connect();
  console.log(`API RUNNING AT : http://localhost:${port} :)`);// eslint-disable-line
});
