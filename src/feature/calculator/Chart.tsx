import { Box } from "@mui/material";
import { getFullLoseProbMat } from "baskin-lib/dist/lib/strategy";
import { scaleLinear } from "d3-scale";

function AxisTick(props : {
    width : number,
    height : number,
    points : {
        y: number
    }[]
}) {
    const { points, width, height } = props;
    return <g id="axis">
        <line x="50"></line>
        {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].map((value, idx)=>(
            <g>
                <text x="0" y={height*(1-value)}>{`${value*100}%`}</text>
                <line key={`axisLine${idx}`} stroke="gray" strokeDasharray="5,5" x1={50} y1={height*value} x2={width+100} y2={height*value}/>
            </g>
        ))}
    </g>
}

function ChartFlag(props : {
    x: number,
    y: number
}) {
    return <></>
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
    while(curr<diff.length) {
        if(diff[curr]>0) {
            let next = curr+1;
            while(next<diff.length) {
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
            while(next<diff.length) {
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

function ChartGraph(props : {
    points : {
        x : number,
        y : number,
        value : number
    }[]
}) {
    const { points } = props;
    const colors = coloringChartMarkers(points);
    return <g>
        <path fill="none" stroke="black" strokeWidth="1.5" d={
            `M ${points[0].x+50} ${points[0].y}` +
            points.map(({x, y}) => `L ${x+50}, ${y}`).join(' ')
        }/>
        {points.map(({x, y, value}, idx) => <circle key={`${idx}`} cx={x+50} cy={y} r="5" fill={colors[idx]} tabIndex={idx} onFocus={()=>{console.dir(`x, y, value = ${x}, ${y}, ${value}`)}}/>)}
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
    const points = data.map((p, idx) => ({x: xScale(idx), y: yScale(p), value: p}));

    return <Box sx={{p: 3, width: width, height: height}}>
        <svg viewBox={`-20 -20 ${width+100} ${height+100}`} width={width} height={height}>
            <AxisTick points={points} width={width} height={height} />
            <ChartGraph points={points}/>
        </svg>
    </Box>
}

export default ChartBox