import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"

const XLabel = (props) => {
  let rotation = "rotate(" + props.tilt + "," + props.x + "," + props.y + ")"
  let anchor
  if (props.tilt !== 0) {
    anchor = "end"
  } else {
    anchor = "middle"
  }

  return(
    <text
      x={props.x} y={props.y} alignmentBaseline="middle"
      textAnchor={anchor} transform={rotation}
      fill={props.color} fontFamily={props.fontFamily}
      display={props.display} >
        {props.name}
    </text>
  )
}

XLabel.defaultProps = {
  color: "#1b1b1b",
  tilt: -65,
  display: "inline"
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
            opacity={style.opacity} display={props.display}>
              {props.value}
          </text>
      }
    </Motion>
  )
}

YLabel.defaultProps = {
  color: "#1b1b1b",
  display: "inline"
}


const Legend = (props) => {
  let titles = Object.keys(props.legend).sort()
  let items = []
  let size = Math.min(20, (props.height / Math.ceil(titles.length/4)) / 1.5)
  for (var i=0; i<titles.length; i++) {
    let title = titles[i]
    if (title) {
      let y = (Math.floor(i/4) * 1.5) * size
      let x = (i % 4) * (props.width / 4)
      items.push(
        <g key={props.legend[title]}>
           <rect x={x} y={y} width={size} height={size}
             fill={props.legend[title]} />
          <text x={x+1.5*size} y={y+(size/2)}
            alignmentBaseline="middle" fontSize={size}
            fontFamily={props.fontFamily}>
              {title}
          </text>
        </g>
      )
    }
  }

  if (items.length === 0) {
    return null
  } else {
    let height = (titles.length * 2 + 1) * props.size
    return(
      <g display={props.display}>
        {items}
      </g>
    )
  }
}

Legend.defaultProps = {
  fontColor: "#1b1b1b",
  display: "inline"
}

module.exports = {
  XLabel,
  YLabel,
  Legend,
}
