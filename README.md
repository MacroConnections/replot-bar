# Scatter Plots for react
Intelligent and customizable bar graph components for react.

## Installation
Only works with React projects. React must be installed separately.
```bash
npm install replot-bar
```

Then with a module bundler like webpack/browserify that supports CommonJS/ES2015
modules, use as you would anything else.

```javascript
import BarGraph from 'replot-bar'
```

## API
replot-bar is designed to easily create BarGraphs.
The only *required* input is proper JSON formatted data.

### Basic Usage
In the simplest case, just supply data (as a Javascript array) and specify the
keys associated with the values -:

```javascript
render() {
  let populations = [
    {country: "China", population: 132275},
    {country: "India", population: 134512},
    {country: "USA", population: 326474},
  ]

  return(
    <BarGraph data={populations}
      xKey="country"
      yKey="population"/>
  )
}
```

- `data` is the only required prop
- `xKey` defaults to `"x"`. X-value of bar graph is number or string.
- `yKey` defaults to `"y"`. Y-value of bar graph is number.

#### Grouped Bar Graph

You can supply the data as array of JSON objects.

```javascript
render() {
  let populations = [
    {country: "China", year: 1980, count: 981200},
    {country: "China", year: 1990, count: 113500},
    {country: "China", year: 2000, count: 126300},
    {country: "India", year: 1980, count: 699000},
    {country: "India", year: 1990, count: 868900},
    {country: "India", year: 2000, count: 104200}
  ]

	return(
		<BarGraph data={populations}
      xKey="year"
      yKey="count"
		  groupKey="country"/>
	)
}
```

- `groupKey` is number or string.

### Dimensions
Dimensions may be specified by passing in `width` and `height` props. The
unit is pixels, and the Bar Graph defaults to 800 by 600 pixels.

The Bar Graph will not function with a width that is less than 60 pixels, or with
a height that is less than 100 pixels.

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {

	return(
		<BarGraph data={populations} width="50%" />
	)
}
```

### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, BarGraph defaults to a built in
color palette.

#### User-provided Color Palette
The user can specify their own desired colored palette for the bar graph to use.
This is done by passing in an array of color strings to the component with the
`color` prop. The displayed point series will cycle through the provided colors.

#### User-provided Color function
The user can specify the color for various bars by providing a function
as well. One can expect to receive the index of the bar (first bar in the
inputted data will have index 0, next group will have index 1, and so on),
the x-value of the corresponding bar, as well as the group, if one exists.
In the example below, color is decided based on the group:

```javascript

colorMe(i, value, group) {
  if (group === "USA"){
    return "red"
  } else if (group === "China") {
    return "blue"
  }
}
render() {
	return(
		<BarGraph data={populations} color={this.colorMe} />
	)
}
```

### Axis Customization
Replot BarGraphs allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below -:

### Steps and Scales
The axes default to linear scales, and intelligently determine the number of divisions
to make along the y-axis. These can be changed by props passed in by the user.

* `yScale`
  * Determines the scaling used for the y-axis
  * Defaults to `"lin"`
  * Accepts `"lin"` or `"log"`
* `ySteps`
  * Determines the number of divisions in the y-axis
  * Defaults to 1 division per 100 pixels
  * Accepts any number

#### Titles
By default, the BarGraph does not display any axis titles. If the user wishes to
include titles, they can pass in some or all of the `xTitle`, `yTitle`, and
`graphTitle` props. These props accept a string value, displayed at the appropriate
location on the graph. To compensate for the inclusion of a title, the graph content
will be pushed further in, but overall the size of the component will remain what
was specified by the user.

#### Showing/Hiding Axis Elements
By default, the BarGraph shows the entirety of the axes, including lines, labels,
and gridlines. These can each individually be disabled by passing in boolean
values of false to the following props:
- showXAxisLine
- showYAxisLine
- showXLabels
- showYLabels
- showGrid
- showLegend

#### Styling the axis
In addition to enabling/disabling titles and axis components, the actual style of
the components can be altered as well, with the use of one `axisStyle` prop that
takes the form of a JavaScript object.

Explanations and defaults follow:

* axisColor
  * modifies the color of the axis line
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of both axis labels
  * defaults to `#000000`
  * accepts any color string
* titleColor
  * modifies the color of all graph titles
  * defaults to `#000000`
  * accepts any color string
* labelColor
  * modifies the color of axis gridlines
  * defaults to `#DDDDDD`
  * accepts any color string
* lineWidth
  * modifies the thickness of axis lines
  * defaults to `2`
  * accepts any number
* lineOpacity
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number

Example of using the axisStyle prop:

```javascript
let style = {
    axisColor: "#f17e33",
    labelColor: "blue",
    titleColor: "#000000",
    gridColor: "#DDDDDD",
    lineWidth: 5,
    lineOpacity: .5
  }

render() {
  ...

  return(
    <BarGraph data={populations} axisStyle={style}/>
  )
}
```

#### Styling the legend
The BarGraph will include a legend by default if a `groupKey` is included.
If not disabled, the legend can be customized through a single `legendStyle` prop that takes the form of a JavaScript object.

Explanations and defaults follow:
* fontColor
	* Modifies the color of the font used in the legend
	* Defaults to `"#000000"`
	* Accepts any color string
* backgroundColor
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* showBorder
 	* Determines whether a border will be drawn around the legend
	* Defaults to `true`
	* Accepts `true` or `false`
* borderColor
	* Modifies the color of the border of the legend
	* Defaults to `"#000000"`
	* Accepts any color string

### Initial Animation
Initial animation is enabled by default, resulting in the bars growing out
from the y-axis. This can be disabled using the
`initialAnimation` prop, passing in a value of false.
