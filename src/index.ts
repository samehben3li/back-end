import { ApolloServer } from "apollo-server"
import * as dotenv from 'dotenv'
import {typeDefs} from "./schema/typeDefs"
import {resolvers} from "./schema/resolvers"


const server = new ApolloServer({typeDefs,resolvers})

dotenv.config()
const port = process.env.PORT || 4000

server.listen().then(({url})=>{
    console.log(`API RUNNING AT port : ${url} :)`)
})