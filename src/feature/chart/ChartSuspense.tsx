import { Box } from "@mui/material";

function ChartSuspense(props : {
    width : number,
    height : number
}) {
    const {width, height} = props;
    return <Box sx={{p: 3, width: width, height: height}}>
    </Box>
}

export default ChartSuspense;