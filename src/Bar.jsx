import React from "react"
import {spring, Motion} from "react-motion"

class Bar extends React.PureComponent {

  constructor(props) {
    super(props)
  }

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

export default Bar
