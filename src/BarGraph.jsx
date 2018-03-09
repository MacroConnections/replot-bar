import React from "react"
import PropTypes from "prop-types"
import {Axis} from "replot-core"
import getColorFunc from "./getColorFunc.js"
import getLegendValues from "./getLegendValues.js"
import BarContainer from "./BarContainer.jsx"

class BarGraph extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    let yVals = this.props.data.map(item => item[this.props.yKey])
    let maxY = Math.max(...yVals)
    if (this.props.errorBarMinKey && this.props.errorBarMaxKey) {
      let yMaxErrors = this.props.data.map(item => item[this.props.errorBarMaxKey] ? item[this.props.errorBarMaxKey] : 0)
      maxY = Math.max(maxY, Math.max(...yMaxErrors))
    }
    let padY = maxY / 16

    let xVals
    let xLabels
    if (this.props.groupKey) {
      xVals = [...new Set(this.props.data.map(item => item[this.props.xKey]))]
      xLabels = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
      xVals.sort()
    } else {
      xVals = this.props.data.map(item => item[this.props.xKey])
      xLabels = xVals
    }

    let colorFunc = getColorFunc(this.props.color)
    let legendValues = this.props.groupKey ? getLegendValues(xVals, colorFunc) : null
    let axisStyle = {
      titleColor: this.props.graphTitleColor,
      titleFontSize: this.props.titleFontSize,
      titleFontFamily: this.props.titleFontFamily,
      labelColor: this.props.labelColor,
      labelFontSize: this.props.labelFontSize,
      labelFontFamily: this.props.labelFontFamily,
      axisColor: this.props.axisColor,
      lineWidth: this.props.axisWidth,
      lineOpacity: this.props.axisOpacity,
      gridColor: this.props.gridColor,
      gridWidth: this.props.gridWidth,
      gridOpacity: this.props.gridOpacity,
      tickColor: this.props.tickColor,
      tickWidth: this.props.tickWidth,
      tickOpacity: this.props.tickOpacity,
    }
    let legendStyle = {
      fontColor: this.props.legendFontColor,
      backgroundColor: this.props.legendBackground,
      showBorder: this.props.legendShowBorder,
      borderColor: this.props.legendBorderColor,
    }

    return (
      <svg width={this.props.width} height={this.props.height}>
        <Axis key="axis" width={this.props.width} height={this.props.height}
          graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
          yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
          showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
          showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
          axisStyle={axisStyle} minY={0} maxY={maxY + padY}
          yScale={this.props.yScale} xAxisMode="discrete" labels={xLabels}
          legendValues={legendValues}
          legendMode={this.props.legendMode} showLegend={this.props.showLegend}
          legendStyle={legendStyle} >
          <BarContainer data={this.props.data} groupKey={this.props.groupKey}
            color={colorFunc} max={maxY+padY} xVals={xVals}
            xKey={this.props.xKey} yKey={this.props.yKey} yScale={this.props.yScale}
            errorBarMinKey={this.props.errorBarMinKey} errorBarMaxKey={this.props.errorBarMaxKey}
            errorBarColor={this.props.errorBarColor}
            vertOffset={this.props.axisWidth/2}
            initialAnimation={this.props.initialAnimation}
            activateTooltip={this.props.activateTooltip}
            deactivateTooltip={this.props.deactivateTooltip}/>
        </Axis>
      </svg>
    )
  }
}

function validateErrorMin(props, propName, componentName) {
  componentName = componentName || 'ANONYMOUS'
  if (!props.errorBarMinKey) {
    return null
  }
  if (typeof props.errorBarMinKey !== 'string') {
    return new Error("errorBarMinKey must be a string.")
  }
  for (let item of props.data) {
    if (item[props.errorBarMinKey] && item[props.errorBarMaxKey]) {
      if (item[props.errorBarMinKey] > item[props.yKey]) {
        return new Error("Min error cannot be larger than the weight.")
      }
      if (item[props.yKey] > item[props.errorBarMaxKey]) {
        return new Error("Max error cannot be smaller than the weight.")
      }
    }
  }
  return null
}

BarGraph.defaultProps = {
  xKey: "x",
  yKey: "y",
  width: 800,
  height: 600,
  color: [
    "#4cab92", "#ca0004", "#8e44ad", "#eccc00",
    "#9dbd5f", "#0097bf", "#005c7a", "#fc6000"
  ],
  yScale: "lin",
  errorBarColor: "#AAA",

  showXAxisLine: true,
  showYAxisLine: true,
  showGrid: true,
  showXLabels: true,
  showYLabels: true,
  showLegend: true,
  legendBackground: "none",
  legendShowBorder: false,
  initialAnimation: true,
}

BarGraph.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  height: PropTypes.number,
  xKey: PropTypes.string,
  yKey: PropTypes.string,
  color: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func
  ]),
  yScale: PropTypes.string,
  errorBarMinKey: validateErrorMin,
  errorBarMaxKey: PropTypes.string,
  errorBarColor: PropTypes.string,

  showXAxisLine: PropTypes.bool,
  showYAxisLine: PropTypes.bool,
  axisColor: PropTypes.string,
  axisWidth: PropTypes.number,
  axisOpacity: PropTypes.number,

  showGrid: PropTypes.bool,
  gridColor: PropTypes.string,
  gridWidth: PropTypes.number,
  gridOpacity: PropTypes.number,

  tickColor: PropTypes.string,
  tickWidth: PropTypes.number,
  tickOpacity: PropTypes.number,

  showXLabels: PropTypes.bool,
  showYLabels: PropTypes.bool,
  labelColor: PropTypes.string,
  labelFontSize: PropTypes.number,
  labelFontFamily: PropTypes.number,

  graphTitleColor: PropTypes.string,
  graphTitleFontSize: PropTypes.number,
  graphTitleFontFamily: PropTypes.number,

  showLegend: PropTypes.bool,
  legendFontColor: PropTypes.string,
  legendBackground: PropTypes.string,
  legendShowBorder: PropTypes.bool,
  legendBorderColor: PropTypes.string,

  initialAnimation: PropTypes.bool,
}

export default BarGraph
