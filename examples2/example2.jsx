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

class NewRow extends React.Component {
  render() {
    let title
    let group
    let weight

    const style = {
      input: {
        width: "80px",
      }
    }

    return(
      <tr>
        <td>
          <input style={style.input} type="text" ref={node => {title = node}}/>
        </td>
        <td>
          <input style={style.input} type="text" ref={node => {group = node}}/>
        </td>
        <td>
          <input style={style.input} type="text" ref={node => {weight = node}}/>
        </td>
        <td>
          <button onClick={() => {
            this.props.addData(title.value,group.value,weight.value)
            title.value=""
            group.value=""
            weight.value=""
          }}>Add</button>
        </td>
      </tr>
    )
  }
}

class ScaleSwitch extends React.Component {
  constructor(props) {
    super()
    this.state = {
      selected: "lin"
    }
  }

  changeHandler(e) {
    this.setState({
      selected: e.target.value
    })
    this.props.updateScale(e.target.value)
  }

  render() {
    const style = {
      cell: {
        width: "80px",
      }
    }

    return (
      <tr>
        <td style={style.cell} >
          <label>
            <input type="radio" value="lin"
              checked={this.state.selected==="lin"}
              onChange={this.changeHandler.bind(this)}/>
            Linear
          </label>
        </td>
        <td style={style.cell} >
          <label>
            <input type="radio" value="log"
              checked={this.state.selected==="log"}
              onChange={this.changeHandler.bind(this)} />
            Log
          </label>
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
        <table>
          <tbody>
            <NewRow addData={this.props.addData.bind(this)} />
          </tbody>
        </table>
        <table>
          <tbody>
            <ScaleSwitch updateScale={this.props.updateScale.bind(this)} />
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
        {weight: 1373, group: "China", title: "Male"},
        {weight: 1266, group: "China", title: "Female"},
        {weight: 323, group: "India", title: "Male"},
        {weight: 258, group: "India", title: "Female"},
        {weight: 205, group: "United States", title: "Male"},
        {weight: 201, group: "United States", title: "Female"},
      ],
      scale: "lin"
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

  addData(title,group,weight) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    mutatedData.push({
      weight: weight,
      group: group,
      title: title
    })
    this.setState({data: mutatedData})
  }

  updateScale(scale) {
    this.setState({scale: scale})
  }

  render() {
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Bar Graph </h1>
        <KeyValueTable data={this.state.data}
          updateData={this.updateData.bind(this)}
          addData={this.addData.bind(this)}
          updateScale={this.updateScale.bind(this)} />
        <div style={{width:"70%", display:"inline-block"}}>
          <BarGraph data={this.state.data} xKey="title" yKey="weight"
            groupKey="group" yScale={this.state.scale} />
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
