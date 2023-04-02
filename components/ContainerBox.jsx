import { styled } from "@mui/system";
import { Box } from "@mui/system";

const CustomContainer = styled(Box)(({ theme, ...props }) => ({
    display: props.display || 'flex',
    backgroundColor: theme.palette.lightGreen.main,
    color: theme.palette.primary.dark,
    padding: 0,
    margin: 0,
    flex: 1,
    overflow: 'auto',
    flexDirection: props.flexDirection,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    paddingTop: props.paddingTop
}))
export default function ContainerBox({ ...props }) {

    return (
        <CustomContainer {...props} />
    )
}