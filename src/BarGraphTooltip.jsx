import React from "react"
import PropTypes from "prop-types"
import {Resize, Tooltip} from "replot-core"
import BarGraph from "./BarGraph.jsx"

class BarGraphTooltip extends React.PureComponent {

  constructor(){
    super()
    this.state = {
      tooltipContents: null,
      mouseOver: false,
      mouseX: null,
      mouseY: null
    }
    this.updateMousePos = this.updateMousePos.bind(this)
    this.activateTooltip = this.activateTooltip.bind(this)
    this.deactivateTooltip = this.deactivateTooltip.bind(this)
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

  render() {
    return (
      <div onMouseMove={this.props.tooltip ? this.updateMousePos : null}>
        <BarGraph
          {...this.props}
          activateTooltip={this.activateTooltip}
          deactivateTooltip={this.deactivateTooltip}
        />
        {this.props.tooltip &&
          <Tooltip
            x={this.state.mouseX} y={this.state.mouseY}
            active={this.state.mouseOver}
            contents={this.state.tooltipContents}
            colorScheme={this.props.tooltipColor}
          />
        }
      </div>
    )
  }
}

BarGraphTooltip.defaultProps = {
  tooltip: true
}

BarGraphTooltip.propTypes = {
  tooltip: PropTypes.bool,
  tooltipColor: PropTypes.string,
  tooltipContents: PropTypes.func,
}


class BarGraphResponsive extends React.Component {

  render() {
    return (
      <Resize width={this.props.width}>
        <BarGraphTooltip {...this.props} />
      </Resize>
    )
  }
}

BarGraphResponsive.defaultProps = {
  width: 800
}


export default BarGraphResponsive
