import Layout from "@/components/Layout";
import initInfo from "@/lib/initInfo";
import dbConnect from "@/lib/mongoose";
import { Card, CardMedia, CardContent, Box, Stack, Typography, List, ListItem, Tooltip } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Mission from "@/models/Mission";
import CopyrightButton from "../components/CopyrightButton";
import { useState } from "react";
import ContainerBox from "../components/ContainerBox";

export default function Profile({ userInfo, missions, characters }) {
    const [openExternalDialog, setOpenExternalDialog] = useState(false);

    const handleOpenExternalDialog = () => {
        setOpenExternalDialog(true);
    };

    const handleCloseExternalDialog = () => {
        setOpenExternalDialog(false);
    };

    return (
        <Layout user={userInfo} characters={characters}>
            <ContainerBox flexDirection='column' alignItems='center' justifyContent='space-evenly' paddingTop='10px' >
                <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia image={userInfo.characterImg} component='img' height='90%' sx={{ margin: '10px' }} />
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography fontSize='40px'>{userInfo.nickname}</Typography>
                        <Typography fontSize='25px' fontStyle='italic'>{userInfo.characterKind}</Typography>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', }}>
                            <img alt='Diamond' src='/images/diamond.png' width='60px' style={{ marginRight: '10px' }} />
                            <Typography fontSize='25px'>{userInfo.xp}</Typography>
                        </Box>
                    </CardContent>
                </Card>
                <>
                    <Typography fontSize='30px' textAlign='center' marginTop='10px'>Megszerzett jutalmaid</Typography>
                    <List component={Stack} direction='row'>
                        {missions.map((item) => (
                            <Tooltip key={item._id} placement='top-start' arrow title={
                                !userInfo.badges?.includes(item._id.toString())
                                    ? `Ezért a jutalomért látogass el a ${item.title}re`
                                    : `Gratulálok! Megszerezted a ${item.title} jutalmát!`
                            }>
                                <ListItem key={item.title}>
                                    <img
                                        src={item.badge_img}
                                        alt={item.badge_name}
                                        width='150px'
                                        style={{ filter: !userInfo.badges?.includes(item._id.toString()) ? 'grayscale(1) contrast(0.1) brightness(0.8)' : 'none' }}
                                    />
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>
                </>
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

    const missionsResult = await Mission.find({ disabled: false })

    const missions = missionsResult.map((doc) => {
        const mission = doc.toObject();
        mission._id = mission._id.toString();
        mission.tasks = JSON.stringify(mission.tasks);
        return mission
    })

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), missions, characters }
    }
}