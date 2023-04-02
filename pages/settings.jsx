import Layout from "@/components/Layout";
import CharacterDialog from "@/components/CharacterDialog";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import dbConnect from "@/lib/mongoose";
import initInfo, { getCharacters } from "../lib/initInfo";
import { Avatar, Card, Grid, IconButton, Typography } from "@mui/material";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/system";
import NameDialog from "../components/NameDialog";
import DeleteUserDialog from "../components/DeleteUserDialog";
import CopyrightButton from "../components/CopyrightButton";
import ContainerBox from "../components/ContainerBox";
import { styled } from "@mui/system";

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    width: 200,
    height: 200,
    margin: '10px'
}))

const CustomButton = styled('button')(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    border: 'none',
    position: 'relative',
    bottom: '210px',
    left: '170px',
    boxShadow: `3px 3px 3px ${theme.palette.primary.light}`,
    cursor: 'pointer'
}))

export default function Settings({ userInfo, characters, email }) {
    const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
    const [openNameDialog, setOpenNameDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openExternalDialog, setOpenExternalDialog] = useState(false);

    const handleOpenExternalDialog = () => {
        setOpenExternalDialog(true);
    };

    const handleCloseExternalDialog = () => {
        setOpenExternalDialog(false);
    };

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
            <ContainerBox flexDirection='column' alignItems='center'>
                <Typography fontSize='30px' sx={{ margin: '10px' }}>Beállítások</Typography>
                <Card sx={{ width: '50%', padding: '10px', borderRadius: '15px' }}>
                    <Grid container sx={{ alignItems: 'center' }}>
                        <Grid item xs={4}>
                            <CustomAvatar alt='User icon' src={userInfo.icon} />
                            <CustomButton onClick={handleOpenCharacters}>
                                <img src='/images/edit_avatar.png' alt='Edit avatar' width='90%' />
                            </CustomButton>
                            <CharacterDialog open={openCharacterDialog} user={userInfo} characters={characters} handleClose={handleCloseCharacters} />
                        </Grid>
                        <Grid item xs={8} sx={{ padding: '5px' }}>
                            <Stack>
                                <Typography fontSize='18px' fontStyle='italic'>Név:</Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography fontSize='25px'>{userInfo.nickname}</Typography>
                                    <IconButton aria-label='Edit' color='secondary' onClick={handleOpenName} size='medium' disableRipple>
                                        <Edit fontSize='inherit' />
                                    </IconButton>
                                    <NameDialog open={openNameDialog} user={userInfo} handleClose={handleCloseName} />
                                </div>
                                <Typography fontSize='18px' fontStyle='italic'>Email:</Typography>
                                <div style={{ display: 'flex' }}>
                                    <Typography fontSize='25px'>{email}</Typography>
                                    <IconButton onClick={handleOpenDelete} aria-label='Delete' color='red' size='medium' disableRipple>
                                        <Delete fontSize='inherit' />
                                    </IconButton>
                                    <DeleteUserDialog open={openDeleteDialog} handleClose={handleCloseDelete} />
                                </div>
                            </Stack>
                        </Grid>
                    </Grid>
                </Card>
                <div style={{ position: 'absolute', bottom: 0, right: 0 }} >
                    <CopyrightButton open={openExternalDialog} handleOpen={handleOpenExternalDialog} handleClose={handleCloseExternalDialog} />
                </div>
            </ContainerBox>
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