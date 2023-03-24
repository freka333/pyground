import dbConnect from "@/lib/mongoose";
import Mission from "@/models/Mission";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import initInfo from "@/lib/initInfo";
import LessonContent from "../../components/LessonContent";
import ExerciseContent from "../../components/ExerciseContent";

export default function ProjectPage({ foundMission, foundTask, hasError, userInfo, characters }) {
    const router = useRouter();

    if (hasError) {
        return <h1>Error</h1>
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            {JSON.stringify({ foundMission, foundTask, hasError, userInfo, characters })}
        </div>
    )

    return (
        <Layout user={userInfo} characters={characters}>
            {
                foundTask.kind === "lesson"
                    ? <LessonContent user={userInfo} characters={characters} mission={foundMission} task={foundTask} />
                    : <ExerciseContent user={userInfo} characters={characters} mission={foundMission} task={foundTask} />
            }
        </Layout>
    )

}

export const getServerSideProps = async (context) => {

    console.log("before getServerSession await")
    const session = await getServerSession(context.req, context.res, authOptions);
    console.log("after getServerSession await")

    if (!session) {
        return { redirect: { destination: '/', permanent: false } }
    }
    await dbConnect();

    console.log("before initInfo(session.user) await")
    const info = await initInfo(session.user);
    console.log("after initInfo(session.user) await")

    const { userInfo, characters } = info;

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
    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), characters }
    }
}
