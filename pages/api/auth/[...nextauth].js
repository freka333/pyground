import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Mission from "@/models/Mission";

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
    events: {
        createUser: async ({ user }) => {
            if (!user.initialized) {
                await dbConnect();
                const firstMission = await Mission.findOne({ num: 1 });
                const userFromDb = await User.findOne({ _id: user.id });
                userFromDb.xp = 0;
                userFromDb.completedTasks = [{
                    mission: firstMission,
                    task: firstMission.tasks[0]._id,
                    completed: false
                }];
                userFromDb.badges = [];
                userFromDb.initialized = true;
                await userFromDb.save()
            }
            return true;
        }
    },
    callbacks: {
        session: async ({ session, user }) => {
            return {
                ...session,
                user: user,
            };
        },
    },
}

export default NextAuth(authOptions)