import dbConnect from "@/lib/mongoose";
import Mission from "@/models/Mission";

export default async function handler(req, res) {

    switch (req.method) {
        case 'GET': {
            await dbConnect();
            const missionResult = await Mission.find({});

            const missions = missionResult.sort((a, b) => a.num - b.num).map(doc => {
                const mission = doc.toObject();
                if (!mission.disabled) {
                    mission._id = mission._id.toString();
                    return {
                        id: mission._id,
                        number: mission.num,
                        title: mission.title,
                        tasks: mission.tasks
                    }
                }
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

            const missionResult = await Mission.findById(req.body.id);
            missionResult.tasks.push({
                path: req.body.path,
                kind: req.body.kind,
                title: req.body.title,
                description: req.body.description,
                ...(req.body.defaultCode && { defaultCode: req.body.defaultCode }),
                ...(req.body.solution && { solution: req.body.solution }),
                ...(req.body.point && { point: req.body.point }),
            });
            await missionResult.save();

            res.status(200).json("successful saving");
            break
        }
        default:
            res.status(405).send({ message: 'Only POST requests allowed' })
            break
    }
}