import { AuthenticationError } from "apollo-server"
import * as jwt from "jsonwebtoken"
import Flag from "../model/Flag"
import User from "../model/User"

export const resolvers = {
    Query:{
        getFlags: async(parent: any,args: any) => {
            return await Flag.find()
        }
    },
    Mutation: {
        login: async (parent: any, {email,password}: any,{ res }: any) => {
            const user = await User.findOne({ email })
            if ((!user)||(password!==user.password)) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const accessToken = jwt.sign({userId: user._id},(process.env.ACCESS_TOKEN_SECRET as string), {expiresIn: "1d"})

            return { accessToken, user }
        },
        addFlag: async (parent: any,args: any,context: any) => {
            const token = context.req.headers.authorization?.split(' ').pop().trim()
            if (!token) {
                throw new AuthenticationError('Not logged in')
            }
            const { userId }: any = jwt.verify(token,(process.env.ACCESS_TOKEN_SECRET as string),{ maxAge: "1d" })
            if (!userId){
                throw new AuthenticationError('Invalid token')
            }
            const flag = await Flag.create({
                userId,
                riskCategory: args.riskCategory,
                pestType: args.pestType,
                plantPart: args.plantPart,
                location: args.location
            })
            return flag
        }
    }
}