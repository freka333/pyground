import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { ObjectId } from "mongodb";

export const authOptions = {
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.SECRET,
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user }) {
            if (!user.initialized) {
                await dbConnect();
                const userFromDb = await User.findOne({ _id: user.id })
                userFromDb.xp = 0;
                userFromDb.completedTasks = [{
                    mission: new ObjectId('63f681c1222e7c73011a7bac'),
                    //task: new ObjectId('')
                }];
                userFromDb.badges = [];
                userFromDb.initialized = true;
                await userFromDb.save()
            }
            else {
                await dbConnect();
                const userFromDb = await User.findOne({ _id: user.id })
                /*const id = "63f681c1222e7c73011a7bac"
                userFromDb.badges.push(id)*/
                await userFromDb.save()
            }
            return true;
        },
        session: async ({ session, user }) => {
            return {
                ...session,
                user: user,
            };
        },
    },
}

export default NextAuth(authOptions)