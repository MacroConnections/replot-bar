import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"

const XLabel = (props) => {
  let rotation = "rotate(" + props.tilt + "," + props.x +
    "," + props.y + ")"
  return(
    <text
      x={props.x} y={props.y}
      textAnchor="end" transform={rotation}
      fill={props.color} fontFamily={props.fontFamily}>
        {props.name}
    </text>
  )
}

XLabel.defaultProps = {
  color: "#1b1b1b",
  fontFamily: "Sans-Serif",
  tilt: -65,
}


const YLabel = (props) => {
  return(
    <Motion
      defaultStyle={{
        opacity: 0,
        y: 0,
      }}
      style={{
        opacity: spring(1, {stiffness: 20, damping: 8}),
        y: spring(props.y, {stiffness: 140, damping: 20}),
      }}
    >
      {
        style =>
          <text
            x="-10" y={style.y}
            textAnchor="end" alignmentBaseline="middle"
            fill={props.color} fontFamily={props.fontFamily}
            opacity={style.opacity} >
              {props.value}
          </text>
      }
    </Motion>
  )
}

YLabel.defaultProps = {
  color: "#1b1b1b",
  fontFamily: "Sans-Serif",
}


const Legend = (props) => {
  let titles = Object.keys(props.legend)
  let rows = [];
  for (var i=0; i<titles.length; i++) {
    let title = titles[i]
    if (title) {
      let y = (i * 2 + 1) * props.size
      let x = props.size
      rows.push(
        <g key={props.legend[title]}>
          <rect x={x} y={y} width={x} height={x}
            fill={props.legend[title]} />
          <text x={3*x} y={y+(x/2)}
            alignmentBaseline="middle" fontSize={x}
            fontFamily={props.fontFamily}>
              {title}
          </text>
        </g>
      )
    }
  }

  if (rows.length === 0) {
    return null
  } else {
    let height = (titles.length * 2 + 1) * props.size
    return(
      <g>
        <rect
          x="0" y="0" width={props.width} height={height}
          strokeWidth={props.strokeWidth}
          stroke={props.strokeColor}
          fill={props.background} />
        {rows}
      </g>
    )
  }
}

Legend.defaultProps = {
  size: 20,
  width: 200,
  fontColor: "#1b1b1b",
  fontFamily: "Sans-Serif",
  strokeColor: "#1b1b1b",
  strokeWidth: 1,
  background: "#ffffff",
}

module.exports = {
  XLabel,
  YLabel,
  Legend,
}
