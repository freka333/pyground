import dbConnect from "@/lib/mongoose"
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case 'POST': {
            const userFromDb = await User.findOne({ _id: req.body.id });
            userFromDb.nickname = req.body.name;
            await userFromDb.save();
            res.status(200).json({ nickname: userFromDb.nickname });
            break
        }
        default: {
            res.status(405).end() // Method not allowed
            break
        }
    }
}