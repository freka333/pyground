import Layout from "@/components/Layout";
import { useState } from "react";
import dbConnect from "@/lib/mongoose";
import Mission from "@/models/Mission";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { Button, Typography } from "@mui/material";
import MissionPopover from "@/components/MissionPopover";
import initInfo from "@/lib/initInfo";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(theme => ({
    island: {
        transition: '1s',
        '&:hover': {
            backgroundColor: 'unset',
            '-webkit-transform': 'scale(1.1)',
            '-ms-transform': 'scale(1.1)',
            transform: 'scale(1.1)',
            transition: '0.5s'
        },
        '&:active': {
            backgroundColor: 'unset'
        }
    }
}), { name: "MuiButtonBase-root" })

export default function Home({ userInfo, missions, characters, completedMissions }) {
    const [anchorElement, setAnchorElement] = useState(null);
    const [openedPopoverId, setOpenedPopoverId] = useState(null);
    const classes = useStyles();

    const handlePopoverOpen = (event, popoverId) => {
        setOpenedPopoverId(popoverId);
        setAnchorElement(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorElement(null);
        setOpenedPopoverId(null);
    }

    return (
        <Layout user={userInfo} characters={characters}>
            <div className="mainPage" style={{ display: 'flex', justifyContent: 'center', overflow: 'auto', paddingTop: '10px' }} >
                <div style={{ display: 'grid', gridTemplateColumns: '350px 350px 350px', gridTemplateRows: '300px 300px' }}>

                    {missions.map((item) => (
                        <div key={item.title} id={item.title} >
                            <Button key={item.title} disableRipple className={classes.island} onClick={e => handlePopoverOpen(e, item._id)}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    width='220px'
                                    style={{
                                        filter: !completedMissions?.includes(item._id) ? 'grayscale(100%)' : 'none',
                                        opacity: !completedMissions?.includes(item._id) ? 0.6 : 1
                                    }}
                                />
                            </Button>
                            <Typography textAlign='center' color='#20013F' fontSize='20px'>{item.title}</Typography>
                            <MissionPopover item={item} completedMissions={completedMissions} openedPopoverId={openedPopoverId} handlePopoverClose={handlePopoverClose} anchorEl={anchorElement} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout >
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

    const completedMissions = [];
    userInfo.completedTasks.forEach(task => {
        if (!completedMissions.includes(task.mission.toString())) {
            completedMissions.push(task.mission.toString());
        }
    });

    console.log("completed:", completedMissions)

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), missions: JSON.parse(JSON.stringify(missions)), characters, completedMissions }
    }
}