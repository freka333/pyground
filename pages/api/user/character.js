import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const session = await getServerSession(req, res, authOptions);
            if (session) {
                const userFromDb = await User.findOne({ _id: session.user.id });
                userFromDb.character = req.body.character;
                await userFromDb.save();
                res.status(200).json({ character: userFromDb.character });
                break
            }
        }
        default: {
            res.status(405).end() // Method not allowed
            break
        }
    }
}