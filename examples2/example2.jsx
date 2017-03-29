import React from "react"
import ReactDOM from "react-dom"
import BarGraph from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      title: this.props.title,
      group: this.props.group,
      weight: e.target.value
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.title+this.props.group}>
        <td style={style.cell}>{this.props.title} </td>
        <td style={style.cell}>{this.props.group} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.weight)}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}


class KeyValueTable extends React.Component {

  render() {
    const style = {
      container: {
        width:"30%",
        display:"inline-block",
        verticalAlign: "top",
        padding: "20px",
      }
    }
    let rows = []
    for (let dataPoint of this.props.data) {
      rows.push(
        <KeyValueRow key={dataPoint.title+dataPoint.group}
          title={dataPoint.title} weight={dataPoint.weight}
          group={dataPoint.group}
          updateData={this.props.updateData.bind(this)} />
      )
    }

    return (
      <div className="container" style={style.container}>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    )
  }

}


class ExampleApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: [
        {weight: 1373, group: "China", title: "Male", color: "#4cab92"},
        {weight: 1266, group: "China", title: "Female", color: "#ca0004"},
        {weight: 323, group: "India", title: "Male", color: "#003953"},
        {weight: 258, group: "India", title: "Female", color: "#eccc00"},
        {weight: 205, group: "United States", title: "Male", color: "#9dbd5f"},
        {weight: 201, group: "United States", title: "Female", color: "#0097bf"},
      ]
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].title === mutatedObject.title &&
        mutatedData[index].group === mutatedObject.group) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseInt(mutatedObject.weight)
      this.setState({data: mutatedData})
    }
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Bar Graph </h1>
        <KeyValueTable data={this.state.data} updateData={this.updateData.bind(this)} />
        <div style={{width:"70%", display:"inline-block"}}>
          <BarGraph data={this.state.data} xKey="title" yKey="weight"
            groupKey="group" />
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
