import Layout from "@/components/Layout";
import CharacterDialog from "@/components/CharacterDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import dbConnect from "@/lib/mongoose";
import initInfo, { getCharacters } from "../lib/initInfo";
import { Avatar, Button, Card, Grid, IconButton, Typography } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { useState } from "react";
import { Stack } from "@mui/system";
import NameDialog from "../components/NameDialog";
import DeleteUserDialog from "../components/DeleteUserDialog";

export default function Settings({ userInfo, characters, email }) {
    const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
    const [openNameDialog, setOpenNameDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenCharacters = () => {
        setOpenCharacterDialog(true);
    }

    const handleCloseCharacters = () => {
        setOpenCharacterDialog(false);
    }

    const handleOpenName = () => {
        setOpenNameDialog(true);
    }

    const handleCloseName = () => {
        setOpenNameDialog(false);
    }

    const handleOpenDelete = () => {
        setOpenDeleteDialog(true);
    }

    const handleCloseDelete = () => {
        setOpenDeleteDialog(false);
    }

    return (
        <Layout user={userInfo} >
            <div className='mainPage' style={{ overflow: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography fontSize='30px' sx={{ margin: '10px' }}>Beállítások</Typography>
                <Card sx={{ width: '50%', padding: '10px', borderRadius: '15px', backgroundColor: '#efe7f7' }}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <Avatar alt="User icon" src={userInfo.icon} sx={{ width: 200, height: 200, margin: '10px', border: '2px solid #370866' }} />
                            <button onClick={handleOpenCharacters} style={{ width: '45px', height: '45px', borderRadius: '50%', border: 'none', backgroundColor: '#33a16a', position: 'relative', bottom: '210px', left: '170px', boxShadow: '3px 3px 3px #847593', cursor: 'pointer' }}>
                                <img src='/images/edit_avatar.png' alt="Edit avatar" width='90%' />
                            </button>
                            <CharacterDialog open={openCharacterDialog} user={userInfo} characters={characters} handleClose={handleCloseCharacters} />
                        </Grid>
                        <Grid item xs={8} sx={{ padding: '5px' }}>
                            <Stack>
                                <Typography fontSize='18px' fontStyle='italic'>Név:</Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography fontSize='25px'>{userInfo.nickname}</Typography>
                                    <IconButton aria-label="Edit" color='secondary' onClick={handleOpenName} size='medium' disableRipple>
                                        <Edit fontSize="inherit" />
                                    </IconButton>
                                    <NameDialog open={openNameDialog} user={userInfo} handleClose={handleCloseName} />
                                </div>
                                <Typography fontSize='18px' fontStyle='italic'>Email:</Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography fontSize='25px'>{email}</Typography>
                                    <IconButton onClick={handleOpenDelete} aria-label="Delete" color='error' size='medium' disableRipple>
                                        <Delete fontSize="inherit" />
                                    </IconButton>
                                    <DeleteUserDialog open={openDeleteDialog} handleClose={handleCloseDelete} />
                                </div>
                            </Stack>


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
    const { userInfo } = info;
    const characters = await getCharacters();
    const email = session.user.email;

    return {
        props: { userInfo: JSON.parse(JSON.stringify(userInfo)), characters, email }
    }
}