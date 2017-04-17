import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"
import {XAxis, YAxis, YTick, GridLine} from "./Axes.jsx"
import {XLabel, YLabel, Legend} from "./Labels.jsx"

let rainbowPalette = ["#3498db","#16a085","#2ecc71","#f1c40f","#e67e22","#c0392b","#9b59b6"]

function rainbow(x,y,group,i) {
  return rainbowPalette[i%rainbowPalette.length];
}

const Bar = (props) => {
  return (
    <Motion
      defaultStyle={{ height: 0 }}
      style={{
        height: spring(props.height, {stiffness: 120, damping: 20})
      }}
    >
      {
        style =>
          <rect
            x={props.x} y={props.graphHeight-style.height}
            width={props.width} height={style.height}
            fill={props.color} />
      }
    </Motion>
  )
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

    this.legend = {}
    this.barScale = 0
    this.step = 0
    this.stepHeight = 0
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

  getBars(barWidth,padding) {
    let bars = this.props.data.map((d,i) => {
      let xVal = d[this.props.xKey]
      let yVal = d[this.props.yKey]
      let group = d[this.props.groupKey]
      let width = barWidth - padding
      let barX = barWidth * i
      let color = this.colorBar(xVal,yVal,group,i)
      if (this.props.yScale === "lin") {
        let height = yVal * this.barScale
        return(
          <Bar
            key={barX} x={barX} graphHeight={this.props.graphH}
            width={width} height={height} color={color} />
        )
      } else {
        let height = Math.log10(yVal) * this.barScale
        return(
          <Bar
            key={barX} x={barX} graphHeight={this.props.graphH}
            width={width} height={height} color={color} />
        )
      }
    })
    return bars
  }

  calculateScale() {
    let maxY = 0
    for (var i = 0; i < this.props.data.length; i++) {
      if (this.props.data[i][this.props.yKey] > maxY) {
        maxY = this.props.data[i][this.props.yKey];
      }
    }
    if (this.props.yScale === "lin") {
      let barScale = this.props.graphH / (maxY * 1.1)
      let unit = 10 ** (Math.floor(Math.log10(maxY)))
      let nearest = Math.ceil(maxY/unit)
      let step = (unit / 10) * nearest
      let stepHeight = step * barScale
      this.barScale = barScale
      this.step = step
      this.stepHeight = stepHeight
    } else {
      let barScale = this.props.graphH / (Math.log10(maxY) * 1.1)
      let maxLog = Math.floor(Math.log10(maxY))
      let unitLog = 10 ** (Math.floor(Math.log10(maxLog)))
      let nearestLog = Math.ceil(maxLog/unitLog)
      let step = Math.max(1, (unitLog/10)*nearestLog)
      let stepHeight = step * barScale
      this.barScale = barScale
      this.step = step
      this.stepHeight = stepHeight
    }
  }

  render() {
    let graphW = Math.min(80*this.props.data.length,800)
    let axisW = graphW + (2 * this.props.margin)
    let w = axisW + (2.5 * this.props.margin)
    let h = this.props.graphH + (5 * this.props.margin)

    let barWidth = graphW/this.props.data.length
    let padding = barWidth * 0.2

    this.calculateScale()

    let step = this.step
    let stepHeight = this.stepHeight

    let barRects = this.getBars(barWidth,padding)

    let xLabels = this.props.data.map((d,i) => {
      let xLabelX = barWidth * (i + 0.5)
      let xLabelY = this.props.graphH + 15
      return(
        <XLabel key={i} x={xLabelX} y={xLabelY} name={d[this.props.xKey]} />
      )
    })

    let yLabels = []
    yLabels.push(
      <YLabel key={this.props.graphH} y={this.props.graphH} value={"0"} />
    )
    for (var i = 1; i * stepHeight < this.props.graphH; i++) {
      let yLabelY = this.props.graphH - (stepHeight * i)
      if (this.props.yScale === "lin") {
        let yLabelVal = Humanize.compactInteger(step*i,1)
        yLabels.push(
          <YLabel key={yLabelY} y={yLabelY} value={yLabelVal} />
        )
      } else {
        let yLabelVal = "e+" + (step*i)
        yLabels.push(
          <YLabel key={yLabelY} y={yLabelY} value={yLabelVal} />
        )
      }
    }

    let yTicks = []
    for (var i = stepHeight; i < this.props.graphH; i = i + stepHeight) {
      let yTickY = this.props.graphH - i
      yTicks.push(
        <YTick key={yTickY} y={yTickY} />
      )
    }

    let gridlines = []
    for (var i = stepHeight; i < this.props.graphH; i = i + stepHeight) {
      let gridY = this.props.graphH - i
      gridlines.push(
        <GridLine key={gridY} y={gridY} width={axisW} />
      )
    }

    let barsShift = "translate(" + this.props.margin + ",0)"
    let graphShift = "translate(" + (w - axisW) +
      "," + this.props.margin + ")"
    let legendShift = "translate(" + w + ",0)"

    return (
      <svg width={w+this.props.legendW} height={h}>
        <g transform={graphShift}>
          <g>{gridlines}</g>
          <g transform={barsShift}>{barRects}</g>
          <g transform={barsShift}>{xLabels}</g>
          <g>{yTicks}</g>
          <g>{yLabels}</g>
          <XAxis width={axisW} height={this.props.graphH}/>
          <YAxis height={this.props.graphH}/>
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
  color: rainbowPalette,
  yScale: "log",
  graphH: 400,
  margin: 25,
  legendW: 200,
}

export default BarGraph
