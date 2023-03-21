import dbConnect from "@/lib/mongoose";
import Character from "@/models/Character";

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET': {
            await dbConnect();
            const characterResult = await Character.find({});

            const characters = characterResult.map(doc => {
                const char = doc.toObject();
                char._id = char._id.toString();
                return char
            })
            res.status(200).json(characters);
            break
        }
        default:
            res.status(405).end() // Method not allowed
            break
    }
}