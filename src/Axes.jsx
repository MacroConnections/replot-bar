import React from "react"
import {spring, Motion} from "react-motion"
import Humanize from "humanize-plus"

const XAxis = (props) => {
  return(
    <line
      x1="0" y1={props.height}
      x2={props.width} y2={props.height}
      strokeWidth={props.strokeWidth} stroke={props.color}
    />
  )
}

XAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
}


const YAxis = (props) => {
  return(
    <line
      x1="0" y1="0"
      x2="0" y2={props.height}
      strokeWidth={props.strokeWidth} stroke={props.color}
    />
  )
}

YAxis.defaultProps = {
  strokeWidth: 2,
  color: "#1b1b1b",
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
            opacity={style.opacity}
          />
      }
    </Motion>
  )
}

YTick.defaultProps = {
  strokeWidth: 2,
  length: 6,
  color: "#1b1b1b",
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
            opacity={style.opacity} display={"inline"}
          />
      }
    </Motion>
  )
}

GridLine.defaultProps = {
  strokeWidth: 2,
  color: "#7f8c8d",
}

module.exports = {
  XAxis,
  YAxis,
  YTick,
  GridLine
}
