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
    let xVals = [...new Set(this.props.data.map(item => item[this.props.xKey]))]
    xVals = xVals.sort((a,b) => a-b)
    let yVals = this.props.data.map(item => item[this.props.yKey])
    let maxY = Math.max(...yVals)
    let padY = maxY / 16

    let xLabels
    if (this.props.groupKey) {
      xLabels = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    } else {
      xLabels = xVals
    }

    let colorFunc = getColorFunc(this.props.color)
    let legendValues = this.props.groupKey ? getLegendValues(xVals, colorFunc) : null

    return (
      <svg width={this.props.width} height={this.props.height}>
        <Axis key="axis" width={this.props.width} height={this.props.height}
          graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
          yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
          showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
          showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
          axisStyle={this.props.axisStyle} minY={0} maxY={maxY + padY}
          yScale={this.props.yScale} xAxisMode="discrete" labels={xLabels}
          legendValues={legendValues}
          legendMode={this.props.legendMode} showLegend={this.props.showLegend}
          legendStyle={this.props.legendStyle} >
          <BarContainer data={this.props.data} groupKey={this.props.groupKey}
            color={colorFunc} max={maxY+padY} xVals={xVals}
            xKey={this.props.xKey} yKey={this.props.yKey} yScale={this.props.yScale}
            vertOffset={this.props.axisStyle.lineWidth/2}
            initialAnimation={this.props.initialAnimation}
            activateTooltip={this.props.activateTooltip}
            deactivateTooltip={this.props.deactivateTooltip}/>
        </Axis>
      </svg>
    )
  }
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
  showXAxisLine: true,
  showXLabels: true,
  showYAxisLine: true,
  showYLabels: true,
  showGrid: true,
  showLegend: true,
  yScale: "lin",
  axisStyle: {
    axisColor: "#000000",
    labelColor: "#000000",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 2,
    lineOpacity: 1
  },
  legendStyle: {
    fontColor: "#000000",
    backgroundColor: "none",
    showBorder: false,
    borderColor: "#000000"
  },
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
  showXAxisLine: PropTypes.bool,
  showXLabels: PropTypes.bool,
  showYAxisLine: PropTypes.bool,
  showYLabels: PropTypes.bool,
  showGrid: PropTypes.bool,
  showLegend: PropTypes.bool,
  yScale: PropTypes.string,
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
  initialAnimation: PropTypes.bool,
}

export default BarGraph
