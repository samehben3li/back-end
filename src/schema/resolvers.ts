import { AuthenticationError } from "apollo-server"
import * as jwt from "jsonwebtoken"
import User from "../model/User"

export const resolvers = {
    //just for test
    Query:{
        all: async (parent:any,args:any) => {
            return await User.find()
        }
    },
    Mutation: {
        login: async (parent: any, {email,password}: any,{ res }: any) => {
            const user = await User.findOne({ email })
            if ((!user)||(password!==user.password)) {
                throw new AuthenticationError('Incorrect credentials')
            }
            const accessToken = jwt.sign({userId: user._id},(process.env.ACCESS_TOKEN_SECRET as string), {expiresIn: "1d"})

            res.cookie("access-token",accessToken)

            return { accessToken, user }

        }
    }
}