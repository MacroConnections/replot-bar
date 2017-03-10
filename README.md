# React x Bar Graph
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
  ];

  return(
    <BarGraph data={populations} xKey="country" 
    yKey="population"/>
  );
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
  ];
	
	return(
		<BarGraph data={populations} xKey="year" yKey="count" 
		groupKey="country"/>
	);
}
```

- `groupKey` defaults to `"group"`. Group of bar graph is number or string.

### Customization

#### Color

* `color`
 * Array of hex colors or Function of x, y, group values to hex color
 * Default: Auto-generated color palette
 * Fills the bars with the iteration of colors, if an array is specified
 * Fills the bars with the output colors, if a function is specified 

##### Example: Array of hex colors
```javascript
let colors = ["#2ecc71","#1abc9c","#16a085"];
<BarGraph data={data} color={colors}>
```
##### Example: Function of x, y, group values to hex color
```javascript
function coloring(x, y, group) {
	if (group === "GroupA") {
		if (x > 10 && y > 10) {
			return "#2980b9";
		} else {
			return "#2c3e50";
		}
	} else {
		return "#95a5a6";
	}
}
<BarGraph data={data} color={coloring}>
```

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

* `yScale`
 * Options: `"linear"`,`"log"`
 * Default: `"linear"` 
 * Sets the scaling of y-axis

* `barWitdh`
 * Options: `"standard"`,`"narrow"`,`"wide"`
 * Default: `"standard"`
 * Sets the style of bar width

#### Axes and Labels

* `gridline`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the gridlines are displayed

* `xAxis`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the x-axis is displayed

* `xLabel`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the x-axis labels are displayed

* `yAxis`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the y-axis is displayed

* `yLabel`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the y-axis labels are displayed

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
 * Allows the module to auto-scale and display group bar graph with doble axes

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

#### Legend

* `barLegend`
 * Options: `"show"`,`"hidden"`
 * Default: `"hidden"`
 * Sets whether the legend for bars is displayed

* `groupLegend`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the legend for groups are displayed, if applicable

* `stackLegend`
 * Options: `"show"`,`"hidden"`
 * Default: `"show"`
 * Sets whether the legend for stacks are displayed, if applicable
