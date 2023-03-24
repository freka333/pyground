import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useState } from "react";

export default function Header({ user }) {
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ height: 64, backgroundColor: 'primary.dark', paddingTop: '5px' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters variant="dense" >
                    <Link href='/' >
                        <Tooltip title="Kezdőlap">
                            <img src="/images/logo.png" alt="Logo" height="30" className='image' />
                        </Tooltip>
                    </Link>

                    <Box sx={{ marginLeft: 'auto', marginRight: '10px' }}>
                        <Tooltip title="Beállítások megnyitása">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: '0px' }}>
                                <div style={{ color: '#eeeaf2', display: 'flex', flexDirection: 'column', marginRight: 10 }}>
                                    <Typography sx={{ textAlign: 'center' }}>{user.nickname}</Typography>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                        <img src="/images/diamond.png" width='25px' alt="Diamond" style={{ paddingRight: '8px' }} />
                                        <Typography>{user.xp}</Typography>
                                    </div>
                                </div>
                                <Avatar alt="Character icon" src={user.icon} sx={{ border: '2px solid #8f44b3', width: 45, height: 45 }} />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: '40px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <Link className='myLink' href="/profile">
                                <MenuItem className='menuItem'> Profil</MenuItem>
                            </Link>
                            <Link className='myLink' href="/settings">
                                <MenuItem className='menuItem'>Beállítások</MenuItem>
                            </Link>
                            <MenuItem className='menuItem' onClick={() => signOut()}>
                                Kijelentkezés
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}