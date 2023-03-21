import { Button, List, ListItem, Popover, Typography } from "@mui/material";
import Link from "next/link";

export default function MissionPopover({ item, completedMissions, openedPopoverId, anchorEl, handlePopoverClose }) {
    return (
        <Popover open={openedPopoverId == item._id} onClose={handlePopoverClose} anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }} >
            <div style={{ width: '200px' }}>
                {!completedMissions?.includes(item._id) ?
                    <Typography textAlign='center'>Erre a szigetre csak azután léphetsz be, ha minden korábbi feladatot megoldottál. </Typography>
                    : <><Typography fontSize='18px' textAlign='center'>
                        {item.title}
                    </Typography>
                        <List>
                            {
                                item.tasks.map(task => (
                                    <ListItem key={task._id} sx={{ padding: '2px' }}>
                                        <Link className='myLink' href={`/${item.title}/${task.path}`}>
                                            <Typography fontSize='15px'>{task.title}</Typography>
                                        </Link>
                                    </ListItem>
                                ))
                            }
                        </List></>
                }
            </div>
        </Popover>
    )
}