import dbConnect from "@/lib/mongoose"
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();
    const userFromDb = await User.findOne({ _id: req.body.id });

    switch (req.method) {
        case 'POST': {
            userFromDb.nickname = req.body.name;
            await userFromDb.save();
            res.status(200).json({ nickname: userFromDb.nickname });
        }
    }
}