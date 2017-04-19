import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"
import {XAxis, YAxis, YTick, GridLine} from "./Axes.jsx"
import {XLabel, YLabel, Legend} from "./Labels.jsx"

/* Default base palette */
let rainbowPalette = [
  "#3498db","#16a085","#2ecc71","#f1c40f","#e67e22","#c0392b","#9b59b6"
]

/* Color function for testing */
function rainbowFunc(x,y,group,i) {
  return rainbowPalette[i%rainbowPalette.length];
}

/* Take a base palette and return a new palette with x (= count) colors.
  Base palette must have at least 2 colors */
function getPalette(basePalette,count) {
  let oldPalette = basePalette
  let newPalette = basePalette.slice(0)
  let i = 1
  while (newPalette.length < count) {
    if (i >= oldPalette.length) {
      oldPalette = newPalette
      newPalette = oldPalette.slice(0)
      i = 1
    }
    let midColor = centerColor(oldPalette[i-1],oldPalette[i])
    newPalette.splice(2*i-1,0,midColor)
    i += 1
  }
  return newPalette
}


function centerColor(colorA,colorB) {
  let rA = parseInt(colorA.substring(1,3), 16)
  let rB = parseInt(colorB.substring(1,3), 16)
  let gA = parseInt(colorA.substring(3,5), 16)
  let gB = parseInt(colorB.substring(3,5), 16)
  let bA = parseInt(colorA.substring(5,7), 16)
  let bB = parseInt(colorB.substring(5,7), 16)
  let r = Math.round((rA + rB) / 2).toString(16)
  let g = Math.round((gA + gB) / 2).toString(16)
  let b = Math.round((bA + bB) / 2).toString(16)
  while (r.length < 2) {
    r = "0" + r
  }
  while (g.length < 2) {
    g = "0" + g
  }
  while (b.length < 2) {
    b = "0" + b
  }
  return "#" + r + g + b
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
            x={props.x} y={props.axisHeight-style.height}
            width={props.width} height={style.height}
            fill={props.color} />
      }
    </Motion>
  )
}


class BarGraph extends React.Component {
  constructor(props) {
    super(props)

    this.legendValues = {}
    this.groupCounter = []
    this.valueCounter = new Set()
    this.palette = []
  }

  calculateScale() {
    let maxBarsW = this.props.maxGraphW - (60 + 50)
    let barsW = Math.min(80 * this.props.data.length, maxBarsW)
    let axisW = barsW + 50
    let graphW = axisW + 60
    let legendH = 50
    let yLabelH = 125
    let axisH = this.props.graphH - (legendH + yLabelH)


    let maxY = 0
    for (var i = 0; i < this.props.data.length; i++) {
      let currY = this.props.data[i][this.props.yKey]
      if (currY > maxY) {
        maxY = currY
      }
    }

    let barScale
    let step
    if (this.props.yScale === "lin") {
      barScale = axisH / (maxY * 1.1)
      let unit = 10 ** (Math.floor(Math.log10(maxY)))
      let nearest = Math.ceil(maxY/unit)
      step = (unit / 10) * nearest
    } else {
      barScale = axisH / (Math.log10(maxY) * 1.1)
      let maxLog = Math.floor(Math.log10(maxY))
      let unitLog = 10 ** (Math.floor(Math.log10(maxLog)))
      let nearestLog = Math.ceil(maxLog/unitLog)
      step = Math.max(1, (unitLog/10)*nearestLog)
    }

    let barWidth
    if (this.props.groupKey) {
      let numGroups = this.groupCounter.length
      barWidth = (barsW-32*(numGroups+1))/this.props.data.length
    } else {
      barWidth = barsW/this.props.data.length
    }

    return ({
      graphW: graphW,
      axisW: axisW,
      barsW: barsW,
      axisH: axisH,
      barScale: barScale,
      step: step,
      barWidth: barWidth,
      legendH: legendH
    })
  }

  getBars(barScale,barWidth,axisH) {
    let bars = []
    let padding = barWidth * 0.2
    let width = barWidth - padding
    let barX = -barWidth
    let prevGroup = null

    if (this.props.groupKey && typeof(this.props.color) !== "function") {
      this.palette = getPalette(this.props.color,this.valueCounter.size)
    }

    for (let i = 0; i < this.props.data.length; i++) {
      let d = this.props.data[i]
      let xVal = d[this.props.xKey]
      let yVal = d[this.props.yKey]
      let group = d[this.props.groupKey]

      if (this.props.groupKey && prevGroup !== group) {
        barX += barWidth + 32
        prevGroup = group
      } else {
        barX += barWidth
      }

      let height
      if (this.props.yScale === "log") {
        height = Math.log10(yVal) * barScale
      } else {
        height = yVal * barScale // linear scale
      }

      let color = this.colorBar(xVal,yVal,group,i)

      bars.push(
        <Bar
          key={barX} x={barX} axisHeight={axisH}
          width={width} height={height} color={color} />
      )
    }
    return bars
  }

  colorBar(x,y,group,i) {
    if (typeof(this.props.color) === "function") {
      let color = this.props.color(x,y,group,i)
      if (group) {
        this.legendValues[x] = color
      }
      return color
    } else {
      if (this.props.groupKey) {
        if (this.legendValues[x]) {
          return this.legendValues[x]
        } else {
          let color = this.palette.shift()
          this.legendValues[x] = color
          return color
        }
      } else {
        return this.props.color[i%this.props.color.length]
      }
    }
  }

  getXLabels(barWidth,axisH) {
    let xLabels = []
    let xLabelY = axisH + 15

    if (this.props.groupKey) {
      let startX = 0
      let totalIndex = 0

      for (let i = 0; i < this.groupCounter.length; i++) {
        let endX = startX + (this.groupCounter[i] * barWidth) + 32
        let xLabelX = (startX + endX) / 2 + 16
        let xValue = this.props.data[totalIndex][this.props.groupKey]
        if (xValue === null) {
          xValue = this.props.data[i][this.props.xKey]
        }
        startX = endX
        totalIndex += this.groupCounter[i]
        xLabels.push(
          <XLabel key={i} x={xLabelX} y={xLabelY} name={xValue} />
        )
      }
    } else {
      for (let i = 0; i < this.props.data.length; i++) {
        let xLabelX = barWidth * (i + 0.5)
        let xValue = this.props.data[i][this.props.xKey]
        xLabels.push(
          <XLabel key={i} x={xLabelX} y={xLabelY} name={xValue}
            display={this.props.xLabel}/>
        )
      }
    }
    return xLabels
  }

  getYLabels(barScale,step,axisH) {
    let yLabels = []
    let stepHeight = step * barScale
    yLabels.push(
      <YLabel key={axisH} y={axisH} value={0} />
    )
    for (var i = 1; i * stepHeight < axisH; i++) {
      let yLabelY = axisH - (stepHeight * i)
      let yLabelVal
      if (this.props.yScale === "log") {
        yLabelVal = "e+" + (step*i)
      } else {
        yLabelVal = Humanize.compactInteger(step*i,1) // linear scale
      }
      yLabels.push(
        <YLabel key={yLabelY} y={yLabelY} value={yLabelVal}
          display={this.props.yLabel} />
      )
    }
    return yLabels
  }

  getYTicks(barScale,step,axisH) {
    let yTicks = []
    let stepHeight = step * barScale
    for (var i = stepHeight; i < axisH; i = i + stepHeight) {
      let yTickY = axisH - i
      yTicks.push(
        <YTick key={yTickY} y={yTickY} display={this.props.yTick} />
      )
    }
    return yTicks
  }

  getGridlines(barScale,step,axisW,axisH) {
    let gridlines = []
    let stepHeight = step * barScale
    for (var i = stepHeight; i < axisH; i = i + stepHeight) {
      let gridY = axisH - i
      gridlines.push(
        <GridLine key={gridY} y={gridY} width={axisW}
          display={this.props.gridline} />
      )
    }
    return gridlines
  }

  render() {
    let groupKey = this.props.groupKey
    let xKey = this.props.xKey

    this.props.data.sort(function(a, b){
      let aGroupKey = a[groupKey]
      let bGroupKey = b[groupKey]
      let aXKey = a[xKey]
      let bXKey = b[xKey]
      if (groupKey && aGroupKey < bGroupKey) {
        return -1
      } else if (groupKey && aGroupKey > bGroupKey) {
        return 1
      } else if (aXKey < bXKey) {
        return -1
      } else if (aXKey > bXKey) {
        return 1
      } else {
        return 0
      }
    })

    if (groupKey) {
      let groupIndex = 0 // first group
      this.groupCounter = [1] // first item in first group
      this.valueCounter.add(this.props.data[0][xKey])
      for (let i = 1; i < this.props.data.length; i++) {
        if (this.props.data[i-1][groupKey] !== this.props.data[i][groupKey]) {
          groupIndex += 1
          this.groupCounter[groupIndex] = 1
        } else {
          this.groupCounter[groupIndex] += 1
        }
        this.valueCounter.add(this.props.data[i][xKey])
      }
    }

    this.legendValues = {}

    let scales = this.calculateScale()

    let barRects = this.getBars(scales.barScale, scales.barWidth, scales.axisH)

    let xLabels = this.getXLabels(scales.barWidth, scales.axisH)

    let yLabels = this.getYLabels(scales.barScale, scales.step, scales.axisH)

    let yTicks = this.getYTicks(scales.barScale, scales.step, scales.axisH)

    let gridlines = this.getGridlines(scales.barScale, scales.step,
      scales.axisW, scales.axisH)

    let barsShift = "translate(" + ((scales.axisW - scales.barsW)/2) + ",0)"
    let axisShift = "translate(" + (scales.graphW - scales.axisW) +
      "," + scales.legendH + ")"

    return (
      <svg width={scales.graphW} height={this.props.graphH}>
        <Legend legend={this.legendValues} width={scales.graphW}
          height={scales.legendH} display={this.props.legend} />
        <g transform={axisShift}>
          <g>{gridlines}</g>
          <g transform={barsShift}>{barRects}</g>
          <g transform={barsShift}>{xLabels}</g>
          <g>{yTicks}</g>
          <g>{yLabels}</g>
          <XAxis width={scales.axisW} height={scales.axisH}
            display={this.props.xAxis}/>
          <YAxis height={scales.axisH} display={this.props.yAxis}/>
        </g>
      </svg>
    )
  }
}

BarGraph.defaultProps = {
  xKey: "x",
  yKey: "y",
  color: rainbowPalette,
  yScale: "lin",
  graphH: 600,
  maxGraphW: 800,
  legend: "inline",
  xAxis: "inline",
  yAxis: "inline",
  yTick: "inline",
  gridline: "inline",
  xLabel: "inline",
  yLabel: "inline"
}

export default BarGraph
