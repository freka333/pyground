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
            <ContainerBox display='block' paddingTop='10px' >
                <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto', minWidth: '750px', width: '55%' }}>
                    <img src={userInfo.characterImg
                    } alt='Character' style={{ padding: '10px', maxWidth: '200px' }} ></img>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography fontSize='40px'>{userInfo.nickname}</Typography>
                        <Typography fontSize='25px' fontStyle='italic'>{userInfo.characterKind}</Typography>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', }}>
                            <img alt='Diamond' src='/images/diamond.png' width='35px' style={{ marginRight: '10px' }} />
                            <Typography fontSize='22px'>{userInfo.xp} gyémántod van</Typography>
                        </Box>
                        <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', }}>
                            <img alt='Level' src={`/images/level${userInfo.level}.png`} width='60px' style={{ marginRight: '10px' }} />
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <Typography fontSize='25px'>{userInfo.levelName}</Typography>
                                <Typography fontSize='18px'>{userInfo.level}. szint</Typography>
                            </Box>
                        </Box>
                        <Typography fontSize='18px' textAlign='center'>
                            {userInfo.level < 4
                                ? `A következő szint eléréséig még ${100 - userInfo.xp % 100} gyémántot kell szerezned!`
                                : 'Eljutottál a legmagasabb szintre, egy igazi Legenda vagy!'}

                        </Typography>
                    </CardContent>
                </Card>
                <>
                    <Typography fontSize='30px' textAlign='center' marginTop='10px'>Megszerzett jutalmaid</Typography>
                    <List component={Stack} direction='row' sx={{ maxWidth: '50%', margin: '0 auto', justifyContent: 'center' }}>
                        {missions.sort((a, b) => a.num - b.num).map((item) => (
                            <Tooltip key={item._id} placement='top-start' arrow title={
                                !userInfo.badges?.includes(item._id.toString())
                                    ? `Ezért a jutalomért látogass el a ${item.title}re`
                                    : `Gratulálok! Megszerezted a ${item.title} jutalmát!`
                            }>
                                <ListItem key={item.title} sx={{ justifyContent: 'center' }}>
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
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <CopyrightButton open={openExternalDialog} handleOpen={handleOpenExternalDialog} handleClose={handleCloseExternalDialog} />
                </div>
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