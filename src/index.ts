import { ApolloServer } from 'apollo-server-express';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as path from 'path';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
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
  cache: 'bounded',
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
  context: ({ req, res }) => ({ req, res }),
});

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log('connected to database');// eslint-disable-line
};

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
};

startApolloServer();

app.listen(port, () => {
  connect();
  console.log(`API RUNNING AT : http://localhost:${port} :)`);// eslint-disable-line
});
