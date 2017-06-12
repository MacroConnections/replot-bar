import React from "react"
import ReactDOM from "react-dom"
import BarGraph from "../src/index.jsx"

class KeyValueRow extends React.Component {

  changeHandler(e) {
    this.props.updateData({
      title: this.props.title,
      weight: e.target.value,
    })
  }

  render() {
    const style = {
      cell: {
        minWidth: "100px",
      }
    }

    return(
      <tr key={this.props.title}>
        <td style={style.cell}>{this.props.title} </td>
        <td style={style.cell}>
          <input type="text" value={parseInt(this.props.weight["one"])}
            onChange={this.changeHandler.bind(this)} />
          <input type="text" value={parseInt(this.props.weight["two"])}
            onChange={this.changeHandler.bind(this)} />
          <input type="text" value={parseInt(this.props.weight["three"])}
            onChange={this.changeHandler.bind(this)} />
        </td>
      </tr>
    )
  }
}

class NewRow extends React.Component {
  render() {
    let title
    let weight

    const style = {
      input: {
        width: "100px",
      }
    }

    return(
      <tr>
        <td>
          <input style={style.input} type="text" ref={node => {title = node}}/>
        </td>
        <td>
          <input style={style.input} type="text" ref={node => {weight = node}}/>
        </td>
        <td>
          <button onClick={() => {
            this.props.addData(title.value,parseInt(weight.value))
            title.value=""
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
        width: "100px",
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
        <KeyValueRow key={dataPoint.title}
          title={dataPoint.title} weight={dataPoint.weight}
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
      // data: [
      //   {weight: {male: 123, female: 231}, title: "China"},
      //   {weight: {male: 342, female: 234}, title: "India"},
      //   {weight: {male: 300, female: 542}, title: "United States"},
      //   {weight: {male: 200, female: 532}, title: "Indonesia"},
      //   {weight: {male: 322, female: 120}, title: "Brazil"},
      //   {weight: {male: 129, female: 112}, title: "Pakistan"},
      //   {weight: {male: 201, female: 102}, title: "Nigeria"},
      //   {weight: {male: 231, female: 210}, title: "Bangladesh"},
      // ],
      data: [
        {weight:{one: 90, two: 225, three: 300}, title:"test 1"},
        {weight:{one: 35, two: 45, three: 75}, title:"test 2"},
        {weight:{one: 150, two: 225, three: 35}, title:"test 3"},
        {weight:{one: 135, two: 220, three: 330}, title:"test 4"},
        {weight:{one: 105, two: 25, three: 310}, title:"test 5"},
        {weight:{one: 10, two: 25, three: 350}, title:"test 6"},
        {weight:{one: 110, two: 120, three: 130}, title:"test 7"},
      ],
      scale: "lin"
    }
  }

  updateData(mutatedObject) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    let chosenIndex = -1
    for (let index=0; index < mutatedData.length; index++) {
      if (mutatedData[index].title === mutatedObject.title) {
        chosenIndex = index
        break
      }
    }
    if (chosenIndex > -1) {
      mutatedData[chosenIndex].weight = parseInt(mutatedObject.weight)
      this.setState({data: mutatedData})
    }
  }

  addData(title,one, two, three) {
    let mutatedData = JSON.parse(JSON.stringify(this.state.data))
    mutatedData.push({
      weight: weight,
      title: title
    })
    this.setState({data: mutatedData})
  }

  updateScale(scale) {
    this.setState({scale: scale})
  }

  render() {
    let keySetA = ["male", "female"]
    let keySetB = ["one", "two", "three"]
    return(
      <div className="container">
        <h1 style={{textAlign: "center"}}> Bar Graph </h1>
        <KeyValueTable data={this.state.data}
          updateData={this.updateData.bind(this)}
          addData={this.addData.bind(this)}
          updateScale={this.updateScale.bind(this)} />
        <div style={{width:"70%", display:"inline-block"}}>
          <BarGraph data={this.state.data} xKey="title" yKey="weight" stackKey={keySetB}
            yScale={this.state.scale} xTitle="country" yTitle="population"/>
        </div>
      </div>
    )
  }
}


ReactDOM.render(
  <ExampleApp />,
  document.getElementById("react-app")
)
