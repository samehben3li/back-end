import { ApolloServer } from '@apollo/server';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import fs from 'fs';
import util from 'util';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';
import uploadFile from './s3';

const app = express();
dotenv.config();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(cors());
const unlinkFile = util.promisify(fs.unlink);

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.imgName);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  const { imgName, dest } = req.body;
  const fileName = dest.concat(imgName);
  const pathOfImg = path.join(__dirname, '/uploads/', imgName);
  const result = await uploadFile(pathOfImg, fileName);
  await unlinkFile(pathOfImg);
  res.status(200).json(result);
});

startApolloServer();

const server = app.listen(port, () => {
  connect();
  console.log(`API RUNNING AT : http://localhost:${port} :)`);// eslint-disable-line
});

export default server;
