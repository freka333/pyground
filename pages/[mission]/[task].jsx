import dbConnect from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";


export default function ProjectPage({ a }) {

    return (
        <div>
            {JSON.stringify({ a })}
        </div>
    )


}

export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: '/', permanent: false } }
    }

    await dbConnect();

    return { props: { a: session } }

    /*console.log("before Mission.find await")
    const missionsResult = await Mission.find({})
    console.log("after Mission.find await")

    /*const missions = missionsResult.map((doc) => {
        const mission = doc.toObject();
        mission._id = mission._id.toString();
        mission.tasks = JSON.parse(JSON.stringify(mission.tasks));
        return mission
    })

    const foundMission = missions.find(item => item.title === context.params?.mission)
    let foundTask;
    if (foundMission) {
        foundTask = foundMission.tasks.find(item => item.path === context.params?.task);
    }
 
    if (!foundTask) {
        return {
            props: { hasError: true }
        }
    }
*/

}
