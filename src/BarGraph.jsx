import React from "react"
import {spring, Motion} from "react-motion"

let greenPalette = ["#3498db","#16a085","#1abc9c","#2ecc71"]

function green(x,y,group,i) {
  return greenPalette[i%greenPalette.length];
}

function groupTest(x,y,group,i) {
  switch (group) {
    case "China":
      return "#e74c3c"
    case "India":
      return "#e67e22"
    case "United States":
      return "#f39c12"
    default:
      return "black"
  }
}


class Bar extends React.Component {

  render() {
    return (
      <Motion
        defaultStyle={{ height: 0 }}
        style={{
          height: spring(this.props.height, {stiffness: 120, damping: 20})
        }}
      >
        {
          style =>
            <rect
              x={this.props.x} y={this.props.graphHeight-style.height}
              width={this.props.width} height={style.height}
              fill={this.props.color} />
        }
      </Motion>
    )
  }
}


class XAxis extends React.Component {

  render() {
    return(
      <line
        x1="0" y1={this.props.height}
        x2={this.props.width} y2={this.props.height}
        strokeWidth={this.props.strokeWidth} stroke={this.props.color}
      />
    )
  }
}

XAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
}


class XLabel extends React.Component {

  render() {
    let rotation = "rotate(" + this.props.tilt + "," + this.props.x +
      "," + this.props.y + ")"
    return(
      <text
        x={this.props.x} y={this.props.y}
        textAnchor="end" transform={rotation}
        fill={this.props.color} fontFamily={this.props.fontFamily}>
          {this.props.name}
      </text>
    )
  }
}

XLabel.defaultProps = {
  color: "#1b1b1b",
  fontFamily: "Sans-Serif",
  tilt: -65,
}


class YAxis extends React.Component {

  render() {
    return(
      <line
        x1="0" y1="0"
        x2="0" y2={this.props.height}
        strokeWidth={this.props.strokeWidth} stroke={this.props.color}
      />
    )
  }
}

YAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
}


class YTick extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          opacity: 0,
          y: 0,
        }}
        style={{
          opacity: spring(1, {stiffness: 20, damping: 8}),
          y: spring(this.props.y, {stiffness: 140, damping: 20}),
        }}
      >
        {
          style =>
            <line
              x1={-this.props.length/2} y1={style.y}
              x2={this.props.length/2} y2={style.y}
              strokeWidth={this.props.strokeWidth} stroke={this.props.color}
              opacity={style.opacity}
            />
        }
      </Motion>
    )
  }
}

YTick.defaultProps = {
  strokeWidth: 2,
  length: 6,
  color: "#1b1b1b",
}


class YLabel extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          opacity: 0,
          y: 0,
        }}
        style={{
          opacity: spring(1, {stiffness: 20, damping: 8}),
          y: spring(this.props.y, {stiffness: 140, damping: 20}),
        }}
      >
        {
          style =>
            <text
              x="-5" y={style.y}
              textAnchor="end" alignmentBaseline="middle"
              fill={this.props.color} fontFamily={this.props.fontFamily}
              opacity={style.opacity} >
                {this.props.value}
            </text>
        }
      </Motion>
    )
  }
}

YLabel.defaultProps = {
  color: "#1b1b1b",
  fontFamily: "Sans-Serif",
}


class GridLine extends React.Component {

  render() {
    return(
      <Motion
        defaultStyle={{
          opacity: 0,
          y: 0,
        }}
        style={{
          opacity: spring(1, {stiffness: 20, damping: 8}),
          y: spring(this.props.y, {stiffness: 140, damping: 20}),
        }}
      >
        {
          style =>
            <line
              x1="0" y1={style.y}
              x2={this.props.width} y2={style.y}
              strokeWidth={this.props.strokeWidth} stroke={this.props.color}
              opacity={style.opacity}
            />
        }
      </Motion>
    )
  }
}

GridLine.defaultProps = {
  strokeWidth: 2,
  color: "#7f8c8d",
}


class Legend extends React.Component {

  render() {
    let titles = Object.keys(this.props.legend)
    let rows = [];
    for (var i=0; i<titles.length; i++) {
      let title = titles[i]
      if (title) {
        let y = (i * 2 + 1) * this.props.size
        let x = this.props.size
        rows.push(
          <g>
            <rect x={x} y={y} width={x} height={x}
              fill={this.props.legend[title]} />
            <text x={3*x} y={y+(x/2)}
              alignmentBaseline="middle" fontSize={x}
              fontFamily={this.props.fontFamily}>
                {title}
            </text>
          </g>
        )
      }
    }

    if (rows.length === 0) {
      return null
    } else {
      let height = (titles.length * 2 + 1) * this.props.size
      return(
        <g>
          <rect
            x="0" y="0" width={this.props.width} height={height}
            strokeWidth={this.props.strokeWidth}
            stroke={this.props.strokeColor}
            fill={this.props.background} />
          {rows}
        </g>
      )
    }
  }
}

Legend.defaultProps = {
  size: 20,
  width: 200,
  fontColor: "#1b1b1b",
  fontFamily: "Sans-Serif",
  strokeColor: "#1b1b1b",
  strokeWidth: 1,
  background: "#ffffff",
}


class BarGraph extends React.Component {
  constructor(props) {
    super(props);

    let xKey = this.props.xKey
    let isNumber = this.props.data.some(function(elt){
      return (typeof(elt[xKey]) === "number")
    })
    if (isNumber) {
      this.props.data.sort(function(a, b){
        let aKey = a[xKey]
        let bKey = b[xKey]
        if (aKey < bKey) {
          return -1
        } else if (aKey > bKey) {
          return 1
        } else {
          return 0
        }
      })
    }

    let graphW = Math.min(80*this.props.data.length,800)
    let graphH = 400
    let margin = 25
    let axisW = graphW + (2 * margin)
    let w = axisW + (2.5 * margin)
    let h = graphH + (5 * margin)

    this.state = {
      graphW: graphW,
      graphH: graphH,
      axisW: axisW,
      margin: margin,
      w: w,
      h: h,
      legendW: 200,
    }

    this.legend = {}
  }

  colorBar(x,y,group,i) {
    if (typeof(this.props.color) === "function") {
      let color = this.props.color(x,y,group,i)
      if (group) {
        this.legend[group] = color
      }
      return color
    } else {
      let palette = this.props.color
      if (this.props.groupKey) {
        if (this.legend[group]) {
          return this.legend[group]
        } else {
          let groups = Object.keys(this.legend)
          let color = palette[groups.length%palette.length];
          this.legend[group] = color
          return color
        }
      } else {
        return palette[i%palette.length]
      }
    }
  }

  render() {
    let maxY = 0
    for (var i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i][this.props.yKey] > maxY) {
        maxY = this.props.data[i][this.props.yKey];
      }
    }
    let barScale = this.state.graphH / (maxY * 1.1);

    let unit = 10 ** (Math.floor(Math.log10(maxY)))
    let nearest = Math.ceil(maxY/unit)
    let step = (unit / 10) * nearest
    let stepHeight = step * barScale

    let barWidth = this.state.graphW/this.props.data.length
    let padding = barWidth * 0.2;

    let barRects = this.props.data.map((d,i) => {
      let xVal = d[this.props.xKey]
      let yVal = d[this.props.yKey]
      let group = d[this.props.groupKey]
      let width = barWidth - padding
      let height = yVal * barScale
      let barX = barWidth * i
      let color = this.colorBar(xVal,yVal,group,i)
      return(
        <Bar
          key={barX} x={barX} graphHeight={this.state.graphH}
          width={width} height={height} color={color} />
      )
    })

    let xLabels = this.props.data.map((d,i) => {
      let xLabelX = barWidth * (i + 0.5)
      let xLabelY = this.state.graphH + 15
      return(
        <XLabel key={i} x={xLabelX} y={xLabelY} name={d[this.props.xKey]} />
      )
    })

    let yLabels = []
    for (var i = 0; i * stepHeight < this.state.graphH; i++) {
      let yLabelY = this.state.graphH - (stepHeight * i)
      let yLabelVal = step * i
      if (Math.log10(yLabelVal) > 3) {
        yLabelVal = yLabelVal.toExponential()
      }
      yLabels.push(
        <YLabel key={yLabelY} y={yLabelY} value={yLabelVal} />
      )
    }

    let yTicks = []
    for (var i = stepHeight; i < this.state.graphH; i = i + stepHeight) {
      let yTickY = this.state.graphH - i
      yTicks.push(
        <YTick key={yTickY} y={yTickY} />
      )
    }

    let gridlines = []
    for (var i = stepHeight; i < this.state.graphH; i = i + stepHeight) {
      let gridY = this.state.graphH - i
      gridlines.push(
        <GridLine key={gridY} y={gridY} width={this.state.axisW} />
      )
    }

    let barsShift = "translate(" + this.state.margin + ",0)"
    let graphShift = "translate(" + (this.state.w - this.state.axisW) +
      "," + this.state.margin + ")"
    let legendShift = "translate(" + this.state.w + ",0)"

    return (
      <svg width={this.state.w+this.state.legendW} height={this.state.h}>
        <g transform={graphShift}>
          <g>{gridlines}</g>
          <g transform={barsShift}>{barRects}</g>
          <g transform={barsShift}>{xLabels}</g>
          <g>{yTicks}</g>
          <g>{yLabels}</g>
          <XAxis width={this.state.axisW} height={this.state.graphH}/>
          <YAxis height={this.state.graphH}/>
        </g>
        <g transform={legendShift}>
          <Legend legend={this.legend} />
        </g>
      </svg>
    )
  }
}

BarGraph.defaultProps = {
  xKey: "x",
  yKey: "y",
  color: greenPalette,
  yScale: "lin",
}

export default BarGraph
