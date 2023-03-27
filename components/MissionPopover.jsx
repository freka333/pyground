import { Button, IconButton, List, ListItem, Popover, Typography } from "@mui/material";
import Link from "next/link";
import CheckCircle from '@mui/icons-material/CheckCircleOutline';
import Lock from '@mui/icons-material/Lock';
import Circle from '@mui/icons-material/TripOrigin';

export default function MissionPopover({ mission, completedMissions, openedPopoverId, anchorEl, handlePopoverClose }) {

    return (
        <Popover open={openedPopoverId == mission._id} onClose={handlePopoverClose} anchorEl={anchorEl} PaperProps={{ sx: { width: '380px', padding: '15px', bgcolor: '#f1eef3' } }}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }} >
            {!completedMissions?.includes(mission._id) ?
                <Typography textAlign='center'>Erre a szigetre csak azután léphetsz be, ha minden korábbi feladatot megoldottál. </Typography>
                : <><Typography fontSize='18px' textAlign='center'>
                    {mission.title}
                </Typography>
                    <List>
                        {
                            mission.tasks.map(task => (
                                <ListItem key={task._id} sx={{ padding: '2px' }}>
                                    <Link style={{ textDecoration: 'none', color: '#4f12cb', display: 'flex', alignItems: 'center' }} href={`/${mission.title}/${task.path}`}>
                                        {task.state === "completed" &&
                                            <IconButton aria-label="Check" color='secondary' disableRipple>
                                                <CheckCircle fontSize="inherit  " />
                                            </IconButton>
                                        }
                                        {task.state === "locked" &&
                                            <IconButton aria-label="Check" disableRipple>
                                                <Lock fontSize="inherit" />
                                            </IconButton>
                                        }
                                        {task.state === "started" &&
                                            <IconButton aria-label="Check" color='greyIcon' disableRipple>
                                                <Circle fontSize="inherit" />
                                            </IconButton>
                                        }
                                        <Typography fontSize='17px'>{task.title}, {task.state}</Typography>
                                    </Link>
                                </ListItem>
                            ))
                        }
                    </List></>
            }
        </Popover>
    )
}