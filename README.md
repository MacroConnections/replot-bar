# Replot x Bar
Intelligent and customizable bar graph components for React projects.

## Installation

## API

### Sample Usage

#### Basic Bar Graph

You can supply the data as array of JSON objects.

```javascript
render() {
  let populations = [
    {country: "China", population: 1388232693},
    {country: "India", population: 1342512706},
    {country: "USA", population: 326474013},
  ]

  return(
    <BarGraph data={populations} xKey="country"
    yKey="population"/>
  )
}
```

- `data` is the only required property
- `xKey` defaults to `"x"`. X-value of bar graph is number or string.
- `yKey` defaults to `"y"`. Y-value of bar graph is number.

#### Group Bar Graph

You can supply the data as array of JSON objects.

```javascript
render() {
  let populations = [
    {country: "China", year: 1980, count: 981200000},
    {country: "China", year: 1990, count: 1135000000},
    {country: "China", year: 2000, count: 1263000000},
    {country: "India", year: 1980, count: 699000000},
    {country: "India", year: 1990, count: 868900000},
    {country: "India", year: 2000, count: 1042000000}
  ]

	return(
		<BarGraph data={populations} xKey="year" yKey="count"
		groupKey="country"/>
	)
}
```

- `groupKey` is number or string.

### Customization

#### Layout

* `graphH`
  * Positive number
  * Default: 600
  * Sets the height of the bar graph

* `maxGraphW`
  * Positive number
  * Default: 800
  * Sets the maximum width of the bar graph

#### Color

* `color`
  * Array of hex colors or Function of x, y, group values to hex color
  * Default: Colorization using an auto generated palette
  * Fills the bars with the iteration of colors from the array, if a color array and no group key are specified
  * Fills the bars using a palette generated based on colors from the array, if a color array and group key are specified
  * Fills the bars with the output colors, if a function is specified

##### Example: Array of hex colors
```javascript
let colors = ["#2ecc71","#1abc9c","#16a085"]
<BarGraph data={data} color={colors}>
```
##### Example: Function of x, y, group values to hex color
```javascript
function coloring(x, y, group) {
	if (group === "GroupA") {
		if (x > 10 && y > 10) {
			return "#2980b9"
		} else {
			return "#2c3e50"
		}
	} else {
		return "#95a5a6"
	}
}
<BarGraph data={data} color={coloring}>
```

#### Axes
##### X-Axis

* `xAxis`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the x-axis if "inline" is selected
  * Do not display the x-axis if "none" is selected

* `xAxisStrokeW`
  * Options: Integer (in px)
  * Default: 1
  * Sets the stroke width of x-axis

* `xAxisColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the color of x-axis

##### Y-Axis

* `yAxis`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the y-axis if "inline" is selected
  * Do not display the y-axis if "none" is selected

* `yScale`
  * Options: `"lin"`,`"log"`
  * Default: `"lin"`
  * Sets the scaling of y-axis to linear if "lin" is selected
  * Sets the scaling of y-axis to logarithmic if "log" is selected

* `yAxisStrokeW`
  * Options: Integer (in px)
  * Default: 1
  * Sets the stroke width of y-axis

* `yAxisColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the color of y-axis

##### Y-Ticks

* `yTick`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the y-axis ticks if "inline" is selected
  * Do not display the y-axis ticks if "none" is selected

* `yTickStrokeW`
  * Options: Integer (in px)
  * Default: 1
  * Sets the stroke width of y-ticks

* `yTickColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the color of y-ticks

* `yTickStrokeW`
  * Options: Integer (in px)
  * Default: 6
  * Sets the length of y-ticks

##### Gridlines

* `gridline`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the gridlines if "inline" is selected
  * Do not display the gridlines if "none" is selected

* `gridlineStrokeW`
  * Options: Integer (in px)
  * Default: 1
  * Sets the stroke width of gridlines

* `gridlineColor`
  * Options: Hex color
  * Default: "#7f8c8d"
  * Sets the color of gridlines

* `gridlineOpacity`
  * Options: Float (between 0 to 1)
  * Default: 0.6
  * Sets the opacity of gridlines

#### Labels

##### X-Labels

* `xLabel`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the x-axis labels if "inline" is selected
  * Do not display the x-axis labels if "none" is selected

* `xLabelColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the color of x-labels

* `xLabelFont`
  * Options: String (font family name)
  * Default: Inherits font type from the parent component
  * Sets the font type of x-labels

* `xLabelTilt`
  * Options: Integer (in degrees)
  * Default: Automatically adjust the tilt angle based on the dataset
  * Sets the tilt angle of x-labels

##### Y-Labels

* `yLabel`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"`
  * Display the y-axis labels if "inline" is selected
  * Do not display the y-axis labels if "none" is selected

* `yLabelColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the color of y-labels

* `yLabelFont`
  * Options: String (font family name)
  * Default: Inherits font type from the parent component
  * Sets the font type of y-labels

#### Legend

* `legend`
  * Options: `"inline"`,`"none"`
  * Default: `"inline"` (Legend is created only if group key is specified)
  * Display the legend if "inline" is selected
  * Do not display the legend if "none" is selected

* `legendColor`
  * Options: Hex color
  * Default: "#1b1b1b"
  * Sets the font color of legend

* `legend`
  * Options: String (font family name)
  * Default: Inherits font type from the parent component
  * Sets the font type of legend

### Future Implementation

#### Stacked Bar Graph

You can supply the data as array of JSON objects.

```javascript
render() {
  let populations = [
    {country: "China", population: {
        male: 697631073, female: 658061503
      }
    },
    {country: "India", population: {
        male: 641674319, female: 594670312
      }
    },
    {country: "USA", population: {
        male: 157082861, female: 161809242
      }
    }
  ]

  let genders = ["male","female"]

  return(
    <BarGraph data={populations} xKey="country"
    yKey="population" stackKey={genders} />
  )
}
```

- `stackKey` defaults to `"stacks"`

#### Layout

* `align`
  * Options: `"bottom"`,`"top"`,`"left"`,`"right"`
  * Default: "bottom"
  * Sets the alignment and orientation of bars and axes.
  * Bars will be oriented vertically for bottom/top aligned graph and horizontally for left/right aligned graph.

* `yTicks`
  * Integer
  * Sets the number of ticks on y-axis
  * The module auto-selects the number of ticks, if not specified

* `barWitdh`
  * Options: `"standard"`,`"narrow"`,`"wide"`
  * Default: `"standard"`
  * Sets the style of bar width

#### Color

* `theme`
  * Options: `"auto"`,`"blue"`,`"green"`,`"yellow"`,`"orange"`,`"red"`,`"pink"`,`"purple"`
  * Default: `"auto"`
  * Sets the color theme of bar graph
  * The module auto-select the color scheme for `"auto"`

* `effect`
  * Options: `"none"`,`"sequential"`,`"diverging"`,`"constant"`,`"gradient"`
  * Default: `"none"`
  * Sets the effect of bar coloring

#### Axes and Labels

* `marker`
  * Options: `"none"`,`"in"`,`"above"`
  * Default: `"none"`
  * No markers are displayed for `"none"`
  * Markers are displayed inside each bar for `"in"`
  * Markers are displayed above each bar for `"above"`

* `graphTitle`
  * String
  * Sets the optional title for the bar graph
  * No title for the graph is set unless specified

* `xTitle`
  * String
  * Sets the optional title for the x-axis
  * No title for the x-axis is set unless specified

* `yTitle`
  * String
  * Sets the optional title for the y-axis
  * No title for the y-axis is set unless specified

* `doubleAxes`
  * Options: `"forbid"`, `"allow"`
  * Default: `"forbid"`
  * Allows the module to auto-scale and display group bar graph with double axes

#### Legend

* `barLegend`
  * Options: `"show"`,`"hidden"`
  * Default: `"hidden"`
  * Sets whether the legend for bars is displayed

* `groupLegend`
   * Options: `"show"`,`"hidden"`
   * Default: `"show"`
   * Sets whether the legend for groups are displayed, if applicable]

* `stackLegend`
  * Options: `"show"`,`"hidden"`
  * Default: `"show"`
  * Sets whether the legend for stacks are displayed, if applicable
