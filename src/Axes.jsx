import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"

const XAxis = (props) => {
  return(
    <line
      x1="0" y1={props.height}
      x2={props.width} y2={props.height}
      strokeWidth={props.strokeWidth} stroke={props.color}
      display={props.display}
    />
  )
}

XAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
  display: "inline"
}


const YAxis = (props) => {
  return(
    <line
      x1="0" y1="0"
      x2="0" y2={props.height}
      strokeWidth={props.strokeWidth} stroke={props.color}
      display={props.display}
    />
  )
}

YAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
  display: "inline"
}


const YTick = (props) => {
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
          <line
            x1={-props.length/2} y1={style.y}
            x2={props.length/2} y2={style.y}
            strokeWidth={props.strokeWidth} stroke={props.color}
            opacity={style.opacity} display={props.display}
          />
      }
    </Motion>
  )
}

YTick.defaultProps = {
  strokeWidth: 2,
  length: 6,
  color: "#1b1b1b",
  display: "inline"
}


const GridLine = (props) => {
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
          <line
            x1="0" y1={style.y}
            x2={props.width} y2={style.y}
            strokeWidth={props.strokeWidth} stroke={props.color}
            opacity={style.opacity} display={props.display}
          />
      }
    </Motion>
  )
}

GridLine.defaultProps = {
  strokeWidth: 2,
  color: "#7f8c8d",
  display: "inline"
}

module.exports = {
  XAxis,
  YAxis,
  YTick,
  GridLine
}
