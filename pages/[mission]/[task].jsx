import dbConnect from "@/lib/mongoose";
import Mission from "@/models/Mission";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import initInfo from "@/lib/initInfo";
import LessonContent from "../../components/LessonContent";
import ExerciseContent from "../../components/ExerciseContent";
import { remark } from 'remark';
import remarkParse from 'remark-parse'
import remarkHtml from 'remark-html';

export default function ProjectPage({ foundMission, foundTask, hasError, userInfo, characters }) {
    const router = useRouter();

    if (hasError) {
        return <h1>Error</h1>
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

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
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return { redirect: { destination: '/', permanent: false } }
    }
    await dbConnect();
    const info = await initInfo(session.user);
    const { userInfo, characters } = info;

    const missionsResult = await Mission.find({})

    const missions = missionsResult.map((doc) => {
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


    const processedContent = await remark()
        .use(remarkParse)
        .use(remarkHtml)
        .process(foundTask.description);
    foundTask.description = processedContent.toString();


    return {
        props: { foundMission, foundTask, userInfo: JSON.parse(JSON.stringify(userInfo)), characters }
    }
}
