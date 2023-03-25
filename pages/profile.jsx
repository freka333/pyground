import Layout from "@/components/Layout";
import initInfo from "@/lib/initInfo";
import dbConnect from "@/lib/mongoose";
import { Card, CardMedia, CardContent, Box, Stack, Typography, Button, List, ListItem, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Mission from "@/models/Mission";

export default function Profile({ userInfo, missions, characters }) {

    return (
        <Layout user={userInfo} characters={characters}>
            <div className="mainPage" style={{ overflow: 'auto' }}>
                <Stack alignItems="center">
                    <Card sx={{ minWidth: 500, maxWidth: 800, display: 'flex', margin: '10px', padding: '10px', borderRadius: '15px', backgroundColor: '#efe7f7' }}>
                        <CardMedia image={userInfo.characterImg} component="img" sx={{ width: 220, flex: 1 }} />
                        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography fontSize='40px'>{userInfo.nickname}</Typography>
                            <Typography fontSize='25px' fontStyle='italic'>{userInfo.characterKind}</Typography>
                            <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', }}>
                                <img alt="Diamond" src="/images/diamond.png" width='60px' style={{ marginRight: '10px' }} />
                                <Typography fontSize='30px'>{userInfo.xp}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <>
                        <Typography fontSize='30px' color='#20013F'>Megszerzett jutalmak</Typography>
                        <List component={Stack} direction="row">
                            {missions.map((item) => (
                                <Tooltip key={item._id} placement='top-start' arrow title={
                                    !userInfo.badges?.includes(item.badge_name)
                                        ? `Ezért a jutalomért látogass el a ${item.title} szigetre`
                                        : `Gratulálok! Megszerezted a ${item.title} sziget jutalmát!`
                                }>
                                    <ListItem key={item.title}>
                                        <img
                                            src={item.badge_img}
                                            alt={item.badge_name}
                                            loading="lazy"
                                            width='150px'
                                            style={{ filter: !userInfo.badges?.includes(item.badge_name) ? 'grayscale(1) contrast(0.1) brightness(0.8)' : 'none' }}
                                        />
                                    </ListItem>
                                </Tooltip>
                            ))}
                        </List>
                    </>
                </Stack>
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
        mission.tasks = JSON.stringify(mission.tasks);
        return mission
    })

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), missions, characters }
    }
}