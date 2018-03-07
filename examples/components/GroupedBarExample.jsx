import React from "react"
import BarChart from "../../index.js"
import ComponentContainer from "./CompContainer/ComponentContainer.jsx"
import colors from "../colors"


class GroupedBarExample extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      optionList: [
        {optionName: "data", optionType: "data", keyList: ["group", "title"], weightKey: "weight", initialValue: [
          {weight: 1379, group: "China", title: 2016},
          {weight: 1371, group: "China", title: 2015},
          {weight: 1364, group: "China", title: 2014},
          {weight: 1357, group: "China", title: 2013},
          {weight: 1351, group: "China", title: 2012},
          {weight: 1344, group: "China", title: 2011},
          {weight: 1338, group: "China", title: 2010},
          {weight: 323, group: "United States", title: 2016},
          {weight: 321, group: "United States", title: 2015},
          {weight: 319, group: "United States", title: 2014},
          {weight: 316, group: "United States", title: 2013},
          {weight: 314, group: "United States", title: 2012},
          {weight: 312, group: "United States", title: 2011},
          {weight: 309, group: "United States", title: 2010},
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
        {optionName: "legendFontColor", name: "Legend Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "legendShowBorder", name: "Show Legend Border", optionType: "bool", initialValue: false},
        {optionName: "legendBorderColor", name: "Legend Border Color", optionType: "field", input: "string", initialValue: colors[this.props.palette].axisColor},
        {optionName: "xKey", name: "X Axis", optionType: "hidden", initialValue: "title"},
        {optionName: "yKey", name: "Y Axis", optionType: "hidden", initialValue: "weight"},
        {optionName: "groupKey", name: "Group", optionType: "hidden", initialValue: "group"}
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
        <h1 style={style.title}> Grouped Bar Chart </h1>
        <ComponentContainer optionList={this.state.optionList}
          palette={this.props.palette}>
          <BarChart data={this.state.optionList[0].initialValue}
            color={colors[this.props.palette].barPalette}/>
        </ComponentContainer>
      </div>
    )
  }

}


export default GroupedBarExample
