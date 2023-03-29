import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";

export default async function handler(req, res) {


    switch (req.method) {
        case 'DELETE': {
            const session = await getServerSession(req, res, authOptions);
            if (session) {
                const db = await dbConnect();
                await db.connection.db.collection("accounts").deleteMany({ userId: mongoose.Types.ObjectId(session.user.id) });
                await db.connection.db.collection("sessions").deleteMany({ userId: mongoose.Types.ObjectId(session.user.id) });
                await User.deleteOne({ _id: mongoose.Types.ObjectId(session.user.id) });
                res.status(200).json("ok");
                break
            }
        }
        default: {
            res.status(405).end()
            break
        }
    }
}