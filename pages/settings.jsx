import Layout from "@/components/Layout";
import initInfo from "@/lib/initInfo";
import dbConnect from "@/lib/mongoose";
import { Avatar, Card, Grid, Typography } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Settings({ userInfo, email }) {
    return (
        <Layout user={userInfo}>
            <div className='mainPage' style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography fontSize='30px'>Beállítások</Typography>
                <Card sx={{ width: '50%' }}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar alt="User icon" src={userInfo.icon} sx={{ width: 200, height: 200, margin: '10px' }} />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography fontSize='25px'>Név:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography fontSize='25px'>{userInfo.nickname}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography fontSize='25px'>Email:</Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography fontSize='25px'>{email}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Card>
            </div>
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
    const email = session.user.email;
    console.log("email:", email)

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), email, characters }
    }
}