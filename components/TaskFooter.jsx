import { Box, Container, Link, Toolbar, Button, List } from "@mui/material";

export default function TaskFooter({ island, currentTaskId, handleNextTask }) {

    return (
        <Toolbar disableGutters variant="dense" sx={{ backgroundColor: '#011627', display: 'flex' }} >
            <img src={island.image} width='40px' />
            {island.tasks.map(task => (
                //<Button key={task._id} className={task._id === currentTaskId ? "currentDot" : "lockedDot"} >a</Button>
                <Button key={task._id} variant='contained' className='buttonn'></Button>
            ))}
            <Button variant="contained" sx={{ backgroundColor: 'secondary.dark' }} onClick={handleNextTask}>Következő</Button>
        </Toolbar>

    )
}