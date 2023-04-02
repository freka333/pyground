import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/system";

const CustomBox = styled('div')(({ theme }) => ({
    color: theme.palette.lightPurpleGrey.main,
    display: 'flex',
    flexDirection: 'column',
    marginRight: 10
}))

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    border: '2px solid',
    borderColor: theme.palette.primary.main,
    width: 45,
    height: 45
}))

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none'
    },
    menuItem: {
        color: theme.palette.primary.dark,
        '&:hover': {
            backgroundColor: theme.palette.lightPurpleGrey.dark,
        }
    }
}))

export default function Header({ user }) {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const classes = useStyles();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position='static' sx={{ height: 64, backgroundColor: 'primary.dark', paddingTop: '5px' }}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters variant='dense' >
                    <Link href='/' >
                        <Tooltip title='Kezdőlap'>
                            <img src='/images/logo.png' alt='Logo' height='30' style={{ padding: '10px' }} />
                        </Tooltip>
                    </Link>

                    <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
                        <Tooltip title='Beállítások megnyitása'>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: '0px' }}>
                                <CustomBox>
                                    <Typography sx={{ textAlign: 'center' }}>{user.nickname}</Typography>
                                    <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <img src='/images/diamond.png' width='25px' alt='Diamond' style={{ paddingRight: '8px' }} />
                                        <Typography>{user.xp}</Typography>
                                    </Box>
                                </CustomBox>
                                <CustomAvatar alt='Character icon' src={user.icon} />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '40px' }}
                            anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                            keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <Link className={classes.link} href='/profile'>
                                <MenuItem className={classes.menuItem}> Profil </MenuItem>
                            </Link>
                            <Link className={classes.link} href='/settings'>
                                <MenuItem className={classes.menuItem}> Beállítások </MenuItem>
                            </Link>
                            <MenuItem className={classes.menuItem} onClick={() => signOut()}>
                                Kijelentkezés
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}