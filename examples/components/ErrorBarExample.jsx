import React from "react"
import BarChart from "../../index.js"
import ComponentContainer from "./CompContainer/ComponentContainer.jsx"
import colors from "../colors"


class ErrorBarExample extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      optionList: [
        {optionName: "data", optionType: "data", keyList: ["country","population","minErr"], weightKey: "maxErr", initialValue: [
          {population: 1373, country: "China", minErr: 1300, maxErr: 1600},
          {population: 1266, country: "India", minErr: 1200, maxErr: 1500},
          {population: 323, country: "United States", minErr: 300, maxErr: 400},
          {population: 958, country: "Indonesia", minErr: 850, maxErr: 1050},
          {population: 805, country: "Brazil", minErr: 750, maxErr: 900},
          {population: 501, country: "Pakistan", minErr: 450, maxErr: 550},
          {population: 786, country: "Nigeria", minErr: 750, maxErr: 900},
          {population: 456, country: "Bangladesh", minErr: 400, maxErr: 550},
        ]},
        {optionName: "width", name: "Width", optionType: "field", input: "string", initialValue: "98%"},
        {optionName: "height", name: "Height", optionType: "field", input: "number", initialValue: 450},
        {optionName: "yScale", name: "Scale", optionType: "state", states: ["lin", "log"], initialValue: "lin"},
        {optionName: "xTitle", name: "X Title", optionType: "field", initialValue: "Country"},
        {optionName: "yTitle", name: "Y Title", optionType: "field", initialValue: "Population"},
        {optionName: "axisColor", name: "Axis Color", optionType: "field", initialValue: colors[this.props.palette].axisColor},
        {optionName: "axisWidth", name: "Axis Line Width", optionType: "field", input: "number", initialValue: 1.5},
        {optionName: "axisOpacity", name: "Axis Line Opacity", optionType: "field", input: "number", initialValue: 1},
        {optionName: "graphTitleColor", name: "Title Color", optionType: "field", initialValue: colors[this.props.palette].axisColor},
        {optionName: "labelColor", name: "Label Color", optionType: "field", initialValue: colors[this.props.palette].axisColor},
        {optionName: "gridColor", name: "Grid Color", optionType: "field", initialValue: colors[this.props.palette].axisColor},
        {optionName: "errorBarColor", name: "Error Bar Color", optionType: "field", initialValue: colors[this.props.palette].axisColor},
        {optionName: "xKey", name: "X Axis", optionType: "hidden", initialValue: "country"},
        {optionName: "yKey", name: "Y Axis", optionType: "hidden", initialValue: "population"},
        {optionName: "errorBarMinKey", name: "Error Bar Min", optionType: "hidden", initialValue: "minErr"},
        {optionName: "errorBarMaxKey", name: "Error Bar Max", optionType: "hidden", initialValue: "maxErr"},
      ],
      barScale: "lin",
    }
  }
  render() {
    let style = {
      title: {
        fontSize: "45px",
        color: colors[this.props.palette].body.text,
        padding: 15,
      },
      container: {
        padding: "80px 0px",
        maxHeight: "1000px"
      },
    }

    return(
      <div className="container" style={style.container}>
        <h1 style={style.title}> Bar Chart with Error Bars</h1>
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <BarChart data={this.state.optionList[0].initialValue}
            color={colors[this.props.palette].barPalette}/>
        </ComponentContainer>
      </div>
    )
  }

}


export default ErrorBarExample
