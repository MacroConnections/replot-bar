import React from "react"
import PropTypes from "prop-types"
import {spring, Motion} from "react-motion"
import {Axis, Resize, Tooltip} from "replot-core"


class Bar extends React.Component {

  render() {
    return (
      <Motion
        defaultStyle={{
          y: (this.props.initialAnimation ? this.props.chartHeight : this.props.y),
          height: (this.props.initialAnimation ? 0 : this.props.height)
        }}
        style={{
          y: spring(this.props.y, {stiffness: 100, damping: 20}),
          height: spring(this.props.height, {stiffness: 100, damping: 20})
        }}
      >
        {
          style =>
            <rect
              x={this.props.x} y={style.y}
              width={this.props.width} height={style.height}
              fill={this.props.color}
              onMouseOver={this.props.activateTooltip.bind(this, this.props.raw)}
              onMouseOut={this.props.deactivateTooltip}/>
        }
      </Motion>
    )
  }
}

class BarContainer extends React.Component {

  render() {
    let series = []
    let unit
    if (this.props.yScale === "log") {
      unit = this.props.height / Math.log10(this.props.max)
    } else {
      unit = this.props.height / this.props.max
    }
    let barX, barHeight, barWidth, dataPoint


    if (this.props.groupKey) {
      let groups = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
      let groupWidth = this.props.width/groups.length
      let paddedWidth = groupWidth/1.5
      barWidth = this.props.barWidth != null ? this.props.barWidth : paddedWidth/this.props.xVals.length/1.2

      let xCoords = {}
      let x = ((groupWidth-paddedWidth)/2)
      if (this.props.barWidth != null) {
        x += (paddedWidth - (barWidth * this.props.xVals.length))/(this.props.xVals.length + 1)/2
      }
      let xVal
      for (let i = 0; i < this.props.xVals.length; i++) {
        xVal = this.props.xVals[i]
        xCoords[xVal] = x
        xCoords[xVal + "index"] = i
        x += paddedWidth/this.props.xVals.length
      }

      for (let i = 0; i < groups.length; i++){
        for (let j = 0; j < this.props.data.length; j++){
          dataPoint = this.props.data[j]
          if (!isNaN(dataPoint[this.props.yKey]) && dataPoint[this.props.groupKey] === groups[i]) {
            barX = xCoords[dataPoint[this.props.xKey]]
            if (this.props.yScale === "log") {
              barHeight = Math.log10(dataPoint[this.props.yKey]) * unit
            } else {
              barHeight = dataPoint[this.props.yKey] * unit
            }
            series.push(
              <Bar key={dataPoint[this.props.groupKey].concat(dataPoint[this.props.xKey])}
                x={barX + barWidth/10} y={this.props.height-barHeight}
                width={barWidth <= 0 ? 0 : barWidth} height={barHeight-this.props.vertOffset}
                chartHeight={this.props.height-this.props.vertOffset}
                color={this.props.color(xCoords[dataPoint[this.props.xKey] + "index"], dataPoint[this.props.xKey], groups[i])}
                initialAnimation={this.props.initialAnimation}
                raw={dataPoint}
                activateTooltip={this.props.activateTooltip}
                deactivateTooltip={this.props.deactivateTooltip}/>
            )
          }
        }
        for (let key in xCoords) {
          if (!key.includes("index")){
            xCoords[key] += this.props.width/groups.length
          }
        }
      }

    } else {
      barWidth = this.props.barWidth != null ? this.props.barWidth : this.props.width/this.props.data.length/2
      for (let i = 0; i < this.props.data.length; i++) {
        dataPoint = this.props.data[i]
        barX = (this.props.width/this.props.data.length/2) + (i*this.props.width/this.props.data.length)
        if (this.props.yScale === "log") {
          barHeight = Math.log10(dataPoint[this.props.yKey]) * unit
        } else {
          barHeight = dataPoint[this.props.yKey] * unit
        }
        series.push(
          <Bar key={dataPoint[this.props.xKey] + " Bar"}
            x={barX-(barWidth/2)} y={this.props.height-barHeight}
            width={barWidth <= 0 ? 0 : barWidth} height={barHeight-this.props.vertOffset}
            chartHeight={this.props.height-this.props.vertOffset}
            color={this.props.color(i, dataPoint[this.props.xKey])}
            initialAnimation={this.props.initialAnimation}
            raw={dataPoint}
            activateTooltip={this.props.activateTooltip}
            deactivateTooltip={this.props.deactivateTooltip}/>
        )
      }
    }

    return (
      <g>
        {series}
      </g>
    )
  }
}


class BarGraph extends React.Component {

  constructor(){
    super()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null
    }
  }

  activateTooltip(data) {
    let newContents
    if (this.props.tooltipContents){
      newContents = this.props.tooltipContents(data)
    }
    else {
      newContents = (
        <div>
          <span>{this.props.xKey}: {data[this.props.xKey]}<br/></span>
          <span>{this.props.yKey}: {data[this.props.yKey]}<br/></span>
          {this.props.groupKey &&
          <span>{this.props.groupKey}: {data[this.props.groupKey]}<br/></span>
          }
        </div>
      )
    }
    this.setState({
      tooltipContents: newContents,
      mouseOver: true,
    })
  }

  deactivateTooltip() {
    this.setState({
      mouseOver: false
    })
  }

  updateMousePos(e) {
    this.setState({
      mouseX: e.pageX,
      mouseY: e.pageY - 10
    })
  }

  getLegend(vals){
    let legendValues = {}
    for (let i = 0; i < vals.length; i++) {
      legendValues[vals[i]] = this.colorBar(i, vals[i])
    }
    return legendValues
  }

  colorBar(i, value, group) {
    if (this.props.color instanceof Array) {
      return this.props.color[i%this.props.color.length]
    } else {
      return this.props.color(i, value, group)
    }
  }

  render() {
    let xVals = [...new Set(this.props.data.map(item => item[this.props.xKey]))]
    xVals = xVals.sort((a,b) => a-b)
    let yVals = this.props.data.map(item => item[this.props.yKey])
    let maxY = Math.max(...yVals)
    let padY = maxY / 5

    let xLabels
    if (this.props.groupKey) {
      xLabels = [...new Set(this.props.data.map(item => item[this.props.groupKey]))]
    } else {
      xLabels = xVals
    }

    let graph = (
      <Axis key="axis" width={this.props.width} height={this.props.height}
        graphTitle={this.props.graphTitle} xTitle={this.props.xTitle}
        yTitle={this.props.yTitle} showXAxisLine={this.props.showXAxisLine}
        showXLabels={this.props.showXLabels} showYAxisLine={this.props.showYAxisLine}
        showYLabels={this.props.showYLabels} showGrid={this.props.showGrid}
        axisStyle={this.props.axisStyle} minY={0} maxY={maxY + padY}
        yScale={this.props.yScale} xAxisMode="discrete" labels={xLabels}
        legendValues={this.props.groupKey ? this.getLegend(xVals) : null}
        legendMode={this.props.legendMode} showLegend={this.props.showLegend}
        legendStyle={this.props.legendStyle} >
        <BarContainer data={this.props.data} groupKey={this.props.groupKey}
          color={this.colorBar.bind(this)} max={maxY+padY} xVals={xVals}
          xKey={this.props.xKey} yKey={this.props.yKey}
          barWidth={this.props.barWidth} yScale={this.props.yScale}
          vertOffset={this.props.axisStyle.lineWidth/2}
          initialAnimation={this.props.initialAnimation}
          activateTooltip={this.activateTooltip.bind(this)}
          deactivateTooltip={this.deactivateTooltip.bind(this)}/>
      </Axis>
    )

    return (
      <div onMouseMove={this.props.tooltip ? this.updateMousePos.bind(this) : null}>
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
        <svg width={this.props.width} height={this.props.height}>
          {graph}
        </svg>
      </div>
    )
  }
}

class BarGraphResponsive extends React.Component {

  render() {

    return (
      <Resize width={this.props.width}>
        <BarGraph {...this.props} />
      </Resize>
    )
  }
}

BarGraphResponsive.defaultProps = {
  width: 800
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
  tooltip: true
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
  barWidth: PropTypes.number,
  yScale: PropTypes.string,
  axisStyle: PropTypes.object,
  legendStyle: PropTypes.object,
  initialAnimation: PropTypes.bool,
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func
}

export default BarGraphResponsive
