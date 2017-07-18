import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"
import {XAxis, YAxis, YTick, GridLine} from "./Axes.jsx"
import {XLabel, XTitle, YLabel, YTitle, Legend} from "./Labels.jsx"
import PropTypes from "prop-types"

/* Default base palette */
let defaultPalette = [
  "#4cab92", "#ca0004", "#8e44ad", "#eccc00",
  "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"
]

/* Flat UI palette */
let flatPalette = [
  "#3498db","#16a085","#2ecc71","#f1c40f","#e67e22","#c0392b","#9b59b6"
]

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

    this.groupMargin = 32 // margin width between groups
    this.legendValues = {}
    this.groupCounter = []
    this.valueCounter = new Set()
    this.palette = []
  }

  calculateScale() {
    let yTitleW
    if (this.props.yTitle) {
      yTitleW = 20
    } else {
      yTitleW = 0
    }
    let minBarsW = Math.max((this.props.width - (60 + 50 + yTitleW)), (yTitleW + 10))
    let barsW = Math.min(this.props.width, minBarsW)
    let axisW = barsW + 50
    let graphW = axisW + 60 + yTitleW

    let xTitleH
    if (this.props.xTitle) {
      xTitleH = 20
    } else {
      xTitleH = 0
    }
    let legendH
    if (this.props.groupKey) {
      legendH = 50
    } else {
      legendH = 0
    }
    let xLabelH = 150
    let axisH = this.props.height - (legendH + xLabelH + xTitleH)
    if (axisH <= 0) {
      axisH = 20
    }

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
      barWidth = (barsW-this.groupMargin*(numGroups+1))/this.props.data.length
      if (barWidth <= 0) {
        barWidth = 1
      }
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
      legendH: legendH,
      xLabelH: xLabelH
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
        barX += barWidth + this.groupMargin
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

    let longestLabel = 0 //length of the longest x label
    for (let d of this.props.data) {
      if (this.props.groupKey) {
        longestLabel = Math.max(longestLabel,d[this.props.groupKey].length)
      } else {
        longestLabel = Math.max(longestLabel,d[this.props.xKey].length)
      }
    }

    let tilt
    if (this.props.xLabelTilt) {
      tilt = this.props.xLabelTilt
    } else {
      let threshold = (this.groupCounter.length + 1) * barWidth * 0.1
      if (longestLabel < threshold) {
        tilt = 0
      } else {
        tilt = -65
      }
    }

    if (this.props.groupKey) {
      let startX = 0
      let totalIndex = 0

      for (let i = 0; i < this.groupCounter.length; i++) {
        let endX = startX + (this.groupCounter[i] * barWidth)
          + this.groupMargin /2
        let xLabelX = (startX + endX) / 2 + this.groupMargin /2
        let xValue = this.props.data[totalIndex][this.props.groupKey]
        if (xValue === null) {
          xValue = this.props.data[i][this.props.xKey]
        }
        startX = endX + this.groupMargin / 2
        totalIndex += this.groupCounter[i]
        xLabels.push(
          <XLabel key={i} x={xLabelX} y={xLabelY} name={xValue}
            color={this.props.xLabelColor} fontFamily={this.props.xLabelFont}
            tilt={tilt} display={this.props.xLabel}/>
        )
      }
    } else {
      for (let i = 0; i < this.props.data.length; i++) {
        let xLabelX = barWidth * (i + 0.4)
        let xValue = this.props.data[i][this.props.xKey]
        xLabels.push(
          <XLabel key={i} x={xLabelX} y={xLabelY} name={xValue}
            color={this.props.xLabelColor} fontFamily={this.props.xLabelFont}
            tilt={tilt} display={this.props.xLabel}/>
        )
      }
    }
    return xLabels
  }

  getYLabels(barScale,step,axisH) {
    let yLabels = []
    let stepHeight = step * barScale
    yLabels.push(
      <YLabel key={axisH} y={axisH} value={0} color={this.props.yLabelColor}
        fontFamily={this.props.yLabelFont} display={this.props.yLabel} />
    )
    for (var i = 1; i * stepHeight < axisH; i++) {
      let yLabelY = axisH - (stepHeight * i)
      let yLabelVal
      if (this.props.yScale === "log") {
        yLabelVal = 10 ** (step*i)
      } else {
        yLabelVal = Humanize.compactInteger(step*i,1) // linear scale
      }
      yLabels.push(
        <YLabel key={yLabelY} y={yLabelY} value={yLabelVal}
          color={this.props.yLabelColor}
          fontFamily={this.props.yLabelFont}
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
        <YTick key={yTickY} y={yTickY} strokeWidth={this.props.yTickStrokeW}
          length={this.props.yTickLength} color={this.props.yTickColor}
          display={this.props.yTick} />
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
          strokeWidth={this.props.gridlineStrokeW}
          color={this.props.gridlineColor}
          opacity={this.props.gridlineOpacity}
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
      "," + 0 + ")"
    let legendShift = "translate(" + (scales.graphW - scales.axisW + (this.props.width/7.5)) +
      "," + (this.props.height - scales.legendH - 20) + ")"

    return (
      <svg width={scales.graphW} height={this.props.height}>
        <YTitle x="10" y={scales.axisH/2} title={this.props.yTitle}
          color={this.props.yTitleColor} fontFamily={this.props.yTitleFont} />
        <g transform={axisShift}>
          <g>{gridlines}</g>
          <g transform={barsShift}>{barRects}</g>
          <g transform={barsShift}>{xLabels}</g>
          <XTitle x={scales.axisW/2.12} y={scales.axisH+scales.xLabelH-30}
            title={this.props.xTitle} color={this.props.xTitleColor}
            fontFamily={this.props.xTitleFont} />
          <g>{yTicks}</g>
          <g>{yLabels}</g>
          <XAxis width={scales.axisW} height={scales.axisH}
            strokeWidth={this.props.xAxisStrokeW}
            color={this.props.xAxisColor}
            display={this.props.xAxis} />
          <YAxis height={scales.axisH} display={this.props.yAxis}
            strokeWidth={this.props.yAxisStrokeW}
            color={this.props.yAxisColor} />
        </g>
        <g transform={legendShift}>
          <Legend legend={this.legendValues} width={scales.axisW}
            height={scales.legendH} fontColor={this.props.legendColor}
            fontFamily={this.props.legendFont} display={this.props.legend} />
        </g>
      </svg>
    )
  }
}

BarGraph.defaultProps = {
  xKey: "x",
  yKey: "y",
  height: 600,
  width: 800,
  color: defaultPalette,
  xAxis: "inline",
  xAxisStrokeW: 2,
  xAxisColor: "#ffffff",
  yAxis: "none",
  yScale: "lin",
  yAxisStrokeW: 2,
  yAxisColor: "#ffffff",
  yTick: "none",
  yTickStrokeW: 1,
  yTickColor: "#ffffff",
  yTickLength: 6,
  gridline: "inline",
  gridlineStrokeW: 1,
  gridlineColor: "#ecf0f1",
  gridlineOpacity: 0.6,
  xTitleColor: "#ffffff",
  xLabel: "inline",
  xLabelColor: "#ffffff",
  yTitleColor: "#ffffff",
  yLabel: "inline",
  yLabelColor: "#ffffff",
  legend: "inline",
  legendColor: "#ffffff",
}

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  xKey: PropTypes.string,
  yKey: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  color: PropTypes.array,
  xAxis: PropTypes.string,
  xAxisStrokeW: PropTypes.number,
  xAxisColor: PropTypes.string,
  yAxis: PropTypes.string,
  yScale: PropTypes.string,
  yAxisStrokeW: PropTypes.number,
  yAxisColor: PropTypes.string,
  yTick: PropTypes.string,
  yTickStrokeW: PropTypes.number,
  yTickColor: PropTypes.string,
  yTickLength: PropTypes.number,
  gridline: PropTypes.string,
  gridlineStrokeW: PropTypes.number,
  gridlineColor: PropTypes.string,
  gridlineOpacity: PropTypes.number,
  xTitleColor: PropTypes.string,
  xLabel: PropTypes.string,
  xLabelColor: PropTypes.string,
  yTitleColor: PropTypes.string,
  yLabel: PropTypes.string,
  yLabelColor: PropTypes.string,
  legend: PropTypes.string,
  legendColor: PropTypes.string,
}

export default BarGraph
