import { Box, Container, Link, Toolbar, Button, List, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import Lock from '@mui/icons-material/Lock';
import { makeStyles } from "@mui/styles";

const TaskTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} componentsProps={{ tooltip: { className: className } }} />
))(`
      color: #2A173D;
      background-color: #e1dbe7;
      border: 1px solid #b3a3c1;
      font-size: 17px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
  `);

const useStyles = makeStyles({
    button: {
        backgroundColor: '#29a366',
        color: '#ebf3ef',
        marginRight: '10px',
        '&:hover': {
            backgroundColor: '#34cd75',
            color: '#fff',
        },
    }
})

export default function TaskFooter({ island, currentTaskId, taskState, nextTaskState, handleNextTask, handleGivenTask }) {
    const classes = useStyles();

    return (
        <Toolbar disableGutters variant="dense" sx={{ backgroundColor: '#011627', display: 'grid', gridTemplateColumns: '1fr auto' }} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <img src={island.image} alt={island.title} width='40px' />
                {island.tasks.map(task => (
                    <TaskTooltip key={task._id} title={<>{task._id !== currentTaskId && task.state === "locked" && <Lock />}{task.title}</>}>
                        <button style={{ marginRight: '10px' }} className={'dot ' + (task._id === currentTaskId
                            ? "currentDot"
                            : task.state === 'locked' ? "lockedDot" : "completedDot")} onClick={() => { if (task.state !== "locked") handleGivenTask(task.path) }} />
                    </TaskTooltip>
                ))}
            </div>
            <Button variant="contained" sx={{ marginRight: '10px', opacity: taskState === "completed" ? 100 : 0, maxWidth: '110px', minWidth: '110px', backgroundColor: 'secondary.dark', color: 'ebf3ef', ':hover': { backgroundColor: '#34cd75', } }} onClick={handleNextTask}>
                {nextTaskState ? "Következő" : "Kész!"}
            </Button>
        </Toolbar>

    )
}