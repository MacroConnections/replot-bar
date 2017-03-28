import React from "react"
//import {spring, Motion} from "react-motion"

function greenDefault(x,y,group,i) {
  let palette = ["#16a085","#2ecc71"];
  return palette[i%palette.length];
}

let greenPalette = ["#16a085","#2ecc71"];

const Bar = ({x,y,w,h,c}) => {
  return (<rect x={x} y={y} width={w} height={h} fill={c} />);
}

class Bars extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let barW = this.props.graphW/this.props.data.length;
    let padding = barW * 0.2;

    if (typeof(this.props.color) === "function") {
      const barRects = this.props.data.map((d,i) => {
        var x=barW*i,
          w=barW-padding,
          h=d[this.props.yKey]*this.props.barScale,
          y=this.props.graphH-h,
          c=this.props.color(d[this.props.xKey],d[this.props.yKey],
            d[this.props.groupKey],i);
        return (<Bar x={x} y={y} w={w} h={h} c={c} />);
      });
      return (<g>{barRects}</g>);

    } else {
      let palette = this.props.color;
      const barRects = this.props.data.map((d,i) => {
        var x=barW*i,
          w=barW-padding,
          h=d[this.props.yKey]*this.props.barScale,
          y=this.props.graphH-h,
          c=palette[i%palette.length];
        return (<rect x={x} y={y} width={w} height={h} fill={c} />);
      });
      return (<g>{barRects}</g>);
    }
  }
}

const XAxis = ({axisW,axisH}) => {
  let strokeW=3, color="#1b1b1b";
  return (<line x1={strokeW} y1={axisH} x2={axisW} y2={axisH}
      strokeWidth={strokeW} stroke={color} />);
}

const YAxis = ({axisW,axisH}) => {
  let strokeW=3, color="#1b1b1b";
  return (<line x1={strokeW} y1={0} x2={strokeW} y2={axisH}
      strokeWidth={strokeW} stroke={color} />);
}

const YTicks = ({axisW,axisH,step}) => {
  let strokeW=3, color="#1b1b1b";
  const ticks = [];
  for (var i=step; i<axisH; i=i+step) {
     ticks.push(<line x1={0} y1={axisH-i} x2={strokeW*2} y2={axisH-i}
                  strokeWidth={strokeW} stroke={color}/>);
  }
  return (<g>{ticks}</g>);
}

const GridLines = ({axisW,axisH,step}) => {
  let strokeW=3, color="#7f8c8d";
  const lines = [];
  for (var i=step; i<axisH; i=i+step) {
     lines.push(<line x1={strokeW} y1={axisH-i} x2={axisW} y2={axisH-i}
                  strokeWidth={strokeW} stroke={color}/>);
  }
  return (<g>{lines}</g>);
}

const Axes = ({axisW,axisH,step}) => {
  return (
    <g>
      <XAxis axisW={axisW} axisH={axisH} />
      <YAxis axisW={axisW} axisH={axisH} />
      <YTicks axisW={axisW} axisH={axisH} step={step} />
    </g>
  );
}

const XLabels = ({graphW,graphH,data,xKey}) => {
  let barW = graphW/data.length;
  let color = "#1b1b1b";
  const labels = data.map((d,i) => {
    let x=barW*(i+0.5), y=graphH+15;
    return (<text x={x} y={y} textAnchor="end"
            transform={"rotate(-65,"+x+","+y+")"}
            fill={color} fontFamily={"Sans-Serif"}>{d[xKey]}</text>);
    });
  return (<g>{labels}</g>);
}

const YLabels = ({axisH,step,stepH}) => {
  let color = "#34495e";
  const labels = [];
  for (var i=0; i*stepH<axisH; i++) {
    var value = step*i;
    if (Math.log10(value) > 3) {
      value = value.toExponential();
    }
    labels.push(
      <text x={-5} y={axisH-stepH*i} textAnchor="end" alignmentBaseline="middle"
        fill={color} fontFamily={"Sans-Serif"}>{value}</text>);
  }
  return (<g>{labels}</g>);
}

class BarGraph extends React.Component {
  constructor(props) {
    super(props);

    let xKey = this.props.xKey;
    var isNumber = this.props.data.some(function(elt){
      return (typeof(elt[xKey]) === "number");
    });
    if (isNumber) {
      this.props.data.sort(function(a, b){
        var aKey = a[xKey], bKey = b[xKey];
        if (aKey < bKey) {
          return -1;
        } else if (aKey > bKey) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    let graphW = Math.min(80*this.props.data.length,800);
    let graphH = 400;
    let margin = 25;
    let axisW = graphW + (2 * margin);
    let w = axisW + (2.5 * margin);
    let h = graphH + (2 * margin);

    this.state = {
      graphW: graphW,
      graphH: graphH,
      axisW: axisW,
      margin: margin,
      w: w,
      h: h,
    }
  }

  render() {
    let maxY = 0;
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i][this.props.yKey] > maxY) {
        maxY = this.props.data[i][this.props.yKey];
      }
    }
    let barScale = this.state.graphH/(maxY*1.1);

    let unit = 10**(Math.floor(Math.log10(maxY)));
    let nearest = Math.ceil(maxY/unit);
    let step = (unit/10)*nearest;
    let stepH = step*barScale;

    return (
      <svg width={this.state.w} height={this.state.w}>
        <g transform={"translate("+(this.state.w-this.state.axisW)+","
          +this.state.margin+")"}>
          <GridLines axisW={this.state.axisW} axisH={this.state.graphH}
            step={stepH} />
          <g transform={"translate("+this.state.margin+",0)"}>
            <Bars graphW={this.state.graphW} graphH={this.state.graphH}
              barScale={barScale} data={this.props.data}
              xKey={this.props.xKey} yKey={this.props.yKey}
              groupKey={this.props.groupKey} color={this.props.color} />
            <XLabels graphW={this.state.graphW} graphH={this.state.graphH}
              xKey={this.props.xKey} data={this.props.data} />
          </g>
          <g>
            <Axes axisW={this.state.axisW} axisH={this.state.graphH}
              step={stepH}/>
            <YLabels axisH={this.state.graphH} stepH={stepH} step={step} />
          </g>
        </g>
      </svg>
    );
  }
}

BarGraph.defaultProps = {
  xKey: "x",
  yKey: "y",
  color: greenPalette,
}

export default BarGraph
