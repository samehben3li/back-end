import { ApolloServer } from "apollo-server"
import express from "express"
import * as dotenv from 'dotenv'
import * as mongoose from "mongoose"
import {typeDefs} from "./schema/typeDefs"
import {resolvers} from "./schema/resolvers"

const app = express()
dotenv.config()
const port = process.env.PORT || 4000
app.use(express.json())

const server = new ApolloServer({
    typeDefs,resolvers,
    context: ({req,res}:any) => ({req,res})
})


const connect = async() => {
    try {
        await mongoose.connect((process.env.MONGO_URI as string))
        console.log("connected to database")
    } catch (err) {
        throw err
    }
}


server.listen({port: port}).then(({url})=>{
    connect()
    console.log(`API RUNNING AT : ${url} :)`)
})