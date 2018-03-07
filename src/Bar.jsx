import React from "react"
import {spring, Motion} from "react-motion"

class Bar extends React.PureComponent {

  constructor(props) {
    super(props)
  }

  render() {
    let errorBar = null
    if (this.props.errorMinY && this.props.errorMaxY) {
      errorBar = <g>
          <line x1={this.props.errorX-5} y1={this.props.errorMinY}
            x2={this.props.errorX+5} y2={this.props.errorMinY}
            strokeWidth={2} stroke={this.props.errorColor}/>
          <line x1={this.props.errorX} y1={this.props.errorMinY}
            x2={this.props.errorX} y2={this.props.errorMaxY}
            strokeWidth={2} stroke={this.props.errorColor}/>
          <line x1={this.props.errorX-5} y1={this.props.errorMaxY}
            x2={this.props.errorX+5} y2={this.props.errorMaxY}
            strokeWidth={2} stroke={this.props.errorColor}/>
        </g>
    }

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
            <g>
              <rect
                x={this.props.x} y={style.y}
                width={this.props.width} height={style.height}
                fill={this.props.color}
                onMouseOver={this.props.activateTooltip.bind(this, this.props.raw)}
                onMouseOut={this.props.deactivateTooltip}/>
              {errorBar}
            </g>
        }
      </Motion>
    )
  }
}

export default Bar
