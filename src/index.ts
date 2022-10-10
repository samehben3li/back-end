import { ApolloServer } from "apollo-server"
import * as dotenv from 'dotenv'
import * as mongoose from "mongoose"
import {typeDefs} from "./schema/typeDefs"
import {resolvers} from "./schema/resolvers"


const server = new ApolloServer({
    typeDefs,resolvers,
    context: ({req,res}:any) => ({req,res})
})

dotenv.config()

const connect = async() => {
    try {
        await mongoose.connect((process.env.MONGO_URI as string))
        console.log("connected to database")
    } catch (err) {
        throw err
    }
}


server.listen().then(({url})=>{
    connect()
    console.log(`API RUNNING AT : ${url} :)`)
})