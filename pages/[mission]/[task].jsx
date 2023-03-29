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
import TaskNotFound from "../../components/TaskNotFound";

export default function ProjectPage({ foundMission, foundTask, hasError, userInfo, characters, missionIdList, defaultCode }) {
    const router = useRouter();

    if (hasError) {
        return <TaskNotFound user={userInfo} characters={characters} />
    }

    if (router.isFallback) {
        return <h1>Loading...</h1>
    }

    return (
        <Layout user={userInfo} characters={characters}>
            {
                foundTask.kind === "lesson"
                    ? <LessonContent user={userInfo} mission={foundMission} task={foundTask} missionIdList={missionIdList} />
                    : <ExerciseContent key={foundTask._id} user={userInfo} mission={foundMission} task={foundTask} missionIdList={missionIdList} defaultCode={defaultCode} />
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

    const missionIdList = [];

    const missionsResult = await Mission.find({}).lean();

    missionsResult.forEach(mission => {
        if (!mission.disabled) {
            mission._id = mission._id.toString();
            missionIdList.push({
                id: mission._id,
                num: mission.num
            });
        }
    })
    missionIdList.sort((a, b) => a.num - b.num);

    const mission = missionsResult.find(mission => mission.title === context.params?.mission);

    let foundTask;
    if (mission) {
        foundTask = mission.tasks.find(item => item.path === context.params?.task);
    }

    if (!foundTask || !userInfo.completedTasks.find(task => task.task.toString() === foundTask._id.toString())) {
        return {
            props: { hasError: true, userInfo: JSON.parse(JSON.stringify(userInfo)), characters }
        }
    }

    mission.tasks.forEach((task) => {
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

    const defaultCode = foundTask.defaultCode || null;

    const processedContent = await remark()
        .use(remarkHtml)
        .process(foundTask.description);
    foundTask.description = processedContent.toString();

    return {
        props: { foundMission: mission, foundTask, userInfo: JSON.parse(JSON.stringify(userInfo)), characters, missionIdList, defaultCode }
    }
}
