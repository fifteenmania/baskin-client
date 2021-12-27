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
    const { points } = props;
    return <path fill="none" stroke="blue" strokeWidth="1.5" d={
        `M ${points[0].x} ${points[0].y}` +
        points.map(({x, y}) => `L ${x}, ${y}`).join(' ')
    }/>
}

function coloringChartMarkers(
    points : {
        value : number
    }[]
) : string[] {
    let colors : string[] = ["black", ];
    let diff : number[] = [];
    for(let i : number = 1; i < points.length; i++) {
        diff[i-1] = points[i].value - points[i-1].value;
    }
    let flag : string = "";
    let curr = 1;
    while(curr<diff.length||curr>1000) {
        if(diff[curr]>0) {
            let next = curr+1;
            while(next<diff.length||next>1000) {
                if(diff[next]<0) {
                    flag = "blue"
                    break;
                }else if(diff[next]>0) {
                    flag = "black"
                    break;
                }else {
                    next++;   
                }
            }
            for(let j : number = curr; j < next; j++) {
                colors[j+1] = flag;
            }
            curr += next-curr;
        }else if(diff[curr]<0) {
            let next = curr+1;
            while(next<diff.length||next>1000) {
                if(diff[next]<0) {
                    flag = "black"
                    break;
                }else if(diff[next]>0) {
                    flag = "red"
                    break;
                }else {
                    next++;   
                }
            }
            for(let j : number = curr; j < next; j++) {
                colors[j+1] = flag;
            }
            curr += next-curr;
        }else {
            colors[curr+1] = flag;
            curr++;
        }
    }
    colors[points.length - 1] = "black";
    return colors; 
}

function ChartMarkers(props : {
    points : {
        x : number,
        y : number,
        value : number
    }[]
}) {
    const { points } = props;
    const colors = coloringChartMarkers(points);
    console.dir(`points = ${points.length}`);
    console.dir(colors);
    return <g>
        {points.map(({x, y, value}, idx) => <circle key={`${idx}`} cx={x} cy={y} r="5" fill={colors[idx]} tabIndex={idx} onFocus={()=>{console.dir(value)}}/>)}
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
    console.dir(data);

    const xScale = scaleLinear().domain([0, data.length-1]).range([0, width]);
    const yScale = scaleLinear().domain([0, 1]).range([0, height]);
    const points = data.map((p, idx) => ({x: xScale(idx), y: yScale(p), value: p}));

    return <Box sx={{p: 3, width: width+20, height: height+20}}>
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