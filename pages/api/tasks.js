import dbConnect from "@/lib/mongoose";
import Mission from "@/models/Mission";

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET': {
            await dbConnect();
            const missionResult = await Mission.find({});

            const missions = missionResult.map(doc => {
                const mission = doc.toObject();
                mission._id = mission._id.toString();
                return { id: mission._id, title: mission.title, tasks: mission.tasks }
            })
            res.status(200).json(missions);
            break
        }
        case 'POST': {
            await dbConnect();

            if (!req.body.id) {
                // Sends a HTTP bad request error code
                return res.status(400).json({ data: 'id not found' })
            }
            console.log("path:", req.body.path)

            const missionResult = await Mission.findById(req.body.id);
            missionResult.tasks.push({
                path: req.body.path,
                serial_number: req.body.serial_number,
                kind: req.body.kind,
                title: req.body.title,
                description: req.body.description,
            });
            await missionResult.save();

            res.status(200).json("siker");
        }
        default:
            res.status(405).send({ message: 'Only POST requests allowed' })
            break
    }
}