import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Character from "@/models/Character";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const userFromDb = await User.findOne({ _id: req.body.id });
            userFromDb.character = req.body.character;
            await userFromDb.save();
            res.status(200).json({ character: userFromDb.character });
            break
        }
        default:
            res.status(405).end() // Method not allowed
            break
    }
}