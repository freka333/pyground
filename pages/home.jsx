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
import CopyrightButton from "../components/CopyrightButton";
import ContainerBox from "../components/ContainerBox";

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
    const [openExternalDialog, setOpenExternalDialog] = useState(false);
    const classes = useStyles();

    const handlePopoverOpen = (event, popoverId) => {
        setOpenedPopoverId(popoverId);
        setAnchorElement(event.currentTarget);
    }

    const handlePopoverClose = () => {
        setAnchorElement(null);
        setOpenedPopoverId(null);
    }

    const handleOpenExternalDialog = () => {
        setOpenExternalDialog(true);
    };

    const handleCloseExternalDialog = () => {
        setOpenExternalDialog(false);
    };

    return (
        <Layout user={userInfo} characters={characters}>
            <ContainerBox flexDirection='column' alignItems='center' justifyContent='space-between' paddingTop='10px' >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridColumnGap: '150px', gridRowGap: '30px' }}>
                    {missions.map((mission) => (
                        <div key={mission.title}>
                            <Button disableRipple className={classes.island} onClick={e => handlePopoverOpen(e, mission._id)}>
                                <img
                                    src={mission.image}
                                    alt={mission.title}
                                    width='220px'
                                    style={{
                                        filter: !completedMissions?.includes(mission._id) ? 'grayscale(100%)' : 'none',
                                        opacity: !completedMissions?.includes(mission._id) ? 0.6 : 1
                                    }}
                                />
                            </Button>
                            <Typography textAlign='center' color='primary.dark' fontSize='20px'>{mission.title}</Typography>
                            <MissionPopover mission={mission} completedMissions={completedMissions} openedPopoverId={openedPopoverId} handlePopoverClose={handlePopoverClose} anchorEl={anchorElement} />
                        </div>
                    ))}
                </div>
                <CopyrightButton open={openExternalDialog} handleOpen={handleOpenExternalDialog} handleClose={handleCloseExternalDialog} />
            </ContainerBox>
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

    const missionsResult = await Mission.find({ disabled: false }).lean();

    missionsResult.forEach(mission => {
        mission._id = mission._id.toString();
        mission.tasks?.forEach(task => {
            task._id = task._id.toString();
            userInfo.completedTasks.forEach(completedTask => {
                if (!task.state || task.state === "locked") {
                    if (task._id === completedTask.task.toString()) {
                        task.state = completedTask.status;
                    }
                    else {
                        task.state = "locked"
                    }

                }
            })
        })
    })
    missionsResult.sort((a, b) => a.num - b.num);

    const completedMissions = [];
    userInfo.completedTasks.forEach(task => {
        if (!completedMissions.includes(task.mission.toString())) {
            completedMissions.push(task.mission.toString());
        }
    });

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), missions: missionsResult, characters, completedMissions }
    }
}