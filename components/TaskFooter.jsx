import { Toolbar, Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import Lock from "@mui/icons-material/Lock";

const TaskTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
))(({ theme }) => ({
    color: theme.palette.codeEditor.main,
    backgroundColor: theme.palette.lightPurpleGrey.dark,
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: '17px',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const CustomButton = styled(Button)(({ theme, task }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.lightGreen.light,
    marginRight: '10px',
    visibility: task.kind === 'lesson' || task.state === 'completed' ? 'visible' : 'hidden',
    maxWidth: '110px',
    minWidth: '110px',
    ':hover': {
        backgroundColor: theme.palette.secondary.dark
    }
}))

export default function TaskFooter({ island, currentTask, nextTaskState, handleNextTask, handleGivenTask }) {

    return (
        <Toolbar disableGutters variant='dense' sx={{ backgroundColor: 'codeEditor.dark', display: 'grid', gridTemplateColumns: '1fr auto' }} >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <img src={island.image} alt={island.title} width='40px' />
                {island.tasks.map(task => {
                    const isLockedTask = task._id !== currentTask._id && task.state === 'locked';
                    const dotStyle = task._id === currentTask._id
                        ? 'currentDot'
                        : task.state === 'locked' ? 'lockedDot' : 'completedDot'
                    return <TaskTooltip key={task._id} title={<>{isLockedTask && <Lock />}{task.title}</>}>
                        <button style={{ marginRight: '10px' }} className={'dot ' + dotStyle} onClick={() => { if (task.state !== 'locked') handleGivenTask(task.path) }} />
                    </TaskTooltip>
                })}
            </div>
            <CustomButton variant='contained' onClick={handleNextTask} task={currentTask}>
                {nextTaskState ? 'Következő' : 'Kész!'}
            </CustomButton>
        </Toolbar>

    )
}