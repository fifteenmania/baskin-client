import { Box } from "@mui/material";
import { getFullLoseProbMat } from "baskin-lib/dist/lib/strategy";
import { scaleLinear } from "d3-scale";

// function AxisTick(props) {
//     const {pos} = props.tick;
//     return <g className="tick" opacity="1" transform={`translate(${pos}, 0})`}>
//         <line stroke="currentColor"></line>
//     </g>
// }

function ChartPath(props : {
    points : {
        x: number,
        y: number
    }[]
}) {
    const {points} = props;
    return <path fill="none" stroke="blue" strokeWidth="1.5" d={
        `M ${points[0].x} ${points[0].y}` +
        points.map(({x, y}) => `L ${x}, ${y}`).join(' ')
    }/>
}

function ChartMarkers(props : {
    points : {
        x : number,
        y : number
    }[]
}) {
    const {points} = props;
    return <g>
        {points.map(({x, y}, idx) => <circle key={`${idx}`} cx={x} cy={y} r="5" fill="black" tabIndex={idx}/>)}
    </g>
}

function ChartBox(props : {
    numPlayer : number,
    maxCall : number,
    numEnd : number,
    width : number,
    height : number
}) {
    const {numPlayer, maxCall, numEnd, width, height} = props;
    const loseMat = getFullLoseProbMat(numPlayer, maxCall, numEnd);
    const data = loseMat.map((row) => row[0]);

    const xScale = scaleLinear().domain([0, data.length-1]).range([0, width]);
    const yScale = scaleLinear().domain([0, 1]).range([0, height]);
    const points = data.map((p, idx) => ({x: xScale(idx), y: yScale(p)}))

    return <Box sx={{p: 3, width: width, height: height}}>
        <svg width={width} height={height}>
            <g>

            </g>
            <g>
                <ChartPath points={points} />
                <ChartMarkers points={points}/>
            </g>
        </svg>
    </Box>
}

export default ChartBox