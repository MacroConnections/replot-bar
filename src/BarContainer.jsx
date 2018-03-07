import React from "react"
import Bar from "./Bar.jsx"

class BarContainer extends React.Component {

  constructor(props) {
    super(props)
  }

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
      barWidth = paddedWidth/this.props.xVals.length/1.2

      let xCoords = {}
      let x = ((groupWidth-paddedWidth)/2)
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
            let errX = barX + barWidth/10 + (barWidth <= 0 ? 0 : barWidth/2)
            let errMinY = null
            let errMaxY = null
            if (this.props.errorBarMinKey && dataPoint[this.props.errorBarMinKey]) {
              let errMin = dataPoint[this.props.errorBarMinKey]
              let errMinHeight = (this.props.yScale === "log") ? Math.log10(errMin) * unit : errMin * unit
              errMinY = this.props.height - errMinHeight
            }
            if (this.props.errorBarMaxKey && dataPoint[this.props.errorBarMaxKey]) {
              let errMax = dataPoint[this.props.errorBarMaxKey]
              let errMaxHeight = (this.props.yScale === "log") ? Math.log10(errMax) * unit : errMax * unit
              errMaxY = this.props.height - errMaxHeight
            }
            series.push(
              <Bar key={`${dataPoint[this.props.groupKey]}-${dataPoint[this.props.xKey]}`}
                x={barX + barWidth/10} y={this.props.height-barHeight}
                width={barWidth <= 0 ? 0 : barWidth} height={barHeight-this.props.vertOffset}
                chartHeight={this.props.height-this.props.vertOffset}
                color={this.props.color(xCoords[dataPoint[this.props.xKey] + "index"], dataPoint[this.props.xKey], groups[i])}
                initialAnimation={this.props.initialAnimation}
                errorX={errX} errorMinY={errMinY} errorMaxY={errMaxY}
                errorColor={this.props.errorBarColor}
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
      barWidth = this.props.width/this.props.data.length/2
      for (let i = 0; i < this.props.data.length; i++) {
        dataPoint = this.props.data[i]
        barX = (this.props.width/this.props.data.length/2) + (i*this.props.width/this.props.data.length)
        if (this.props.yScale === "log") {
          barHeight = Math.log10(dataPoint[this.props.yKey]) * unit
        } else {
          barHeight = dataPoint[this.props.yKey] * unit
        }
        let errMinY = null
        let errMaxY = null
        if (this.props.errorBarMinKey && dataPoint[this.props.errorBarMinKey]) {
          let errMin = dataPoint[this.props.errorBarMinKey]
          let errMinHeight = (this.props.yScale === "log") ? Math.log10(errMin) * unit : errMin * unit
          errMinY = this.props.height - errMinHeight
        }
        if (this.props.errorBarMaxKey && dataPoint[this.props.errorBarMaxKey]) {
          let errMax = dataPoint[this.props.errorBarMaxKey]
          let errMaxHeight = (this.props.yScale === "log") ? Math.log10(errMax) * unit : errMax * unit
          errMaxY = this.props.height - errMaxHeight
        }
        series.push(
          <Bar key={dataPoint[this.props.xKey] + " Bar"}
            x={barX-(barWidth/2)} y={this.props.height-barHeight}
            width={barWidth <= 0 ? 0 : barWidth} height={barHeight-this.props.vertOffset}
            chartHeight={this.props.height-this.props.vertOffset}
            color={this.props.color(i, dataPoint[this.props.xKey])}
            initialAnimation={this.props.initialAnimation}
            errorX={barX} errorMinY={errMinY} errorMaxY={errMaxY}
            errorColor={this.props.errorBarColor}
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

export default BarContainer
