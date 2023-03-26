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
                    ? <LessonContent user={userInfo} mission={foundMission} task={foundTask} />
                    : <ExerciseContent user={userInfo} mission={foundMission} task={foundTask} />
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

    const missionResult = await Mission.findOne({ title: context.params?.mission }).lean();

    let foundTask;
    if (missionResult) {
        foundTask = missionResult.tasks.find(item => item.path === context.params?.task);
    }

    if (!foundTask) {
        return {
            props: { hasError: true }
        }
    }

    missionResult.tasks.forEach((task) => {
        task._id = task._id.toString();
        userInfo.completedTasks.forEach(completedTask => {
            if (!task.state || task.state === "locked") {
                if (task._id === completedTask.task.toString()) {
                    if (completedTask.completed) {
                        task.state = "completed";
                    }
                    else {
                        task.state = "started";
                    }

                }
                else {
                    task.state = "locked"
                }

            }
        })
    })

    missionResult._id = missionResult._id.toString();

    const processedContent = await remark()
        .use(remarkHtml)
        .process(foundTask.description);
    foundTask.description = processedContent.toString();

    return {
        props: { foundMission: missionResult, foundTask: foundTask, userInfo: JSON.parse(JSON.stringify(userInfo)), characters }
    }
}
