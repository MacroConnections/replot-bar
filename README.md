# React x Bar Graph
Intelligent and customizable bar graph components for React projects.

## Installation

## API

### Sample Usage

#### Basic Bar Graph

You can supply the data as a list of [x_value, y_value] where x_value is number or string and y_value is number

```javascript
render() {
	let populations = [
		["China",1388232693],
		["India",1342512706],
		["USA",326474013]
	]

	return(
		<BarGraph data={populations} />
	)
}
```

You can also supply the data in JSON format

```javascript
render() {
  let populations = {
    {country: "China", population: 1388232693},
    {country: "India", population: 1342512706},
    {country: "USA", population: 326474013},
  }

  return(
    <BarGraph data={populations} xKey="country" 
    yKey="population"/>
  )
}
```

- `data` is the only required property
- `xKey` defaults to `"label"`
- `yKey` defaults to `"value"`

#### Group Bar Graph

You can supply the group (number or string) as key and the data as lists of [x_value, y_value]

```javascript
render() {
	let populations = {
		"China":[
			[1980,981200000],
			[1990,1135000000],
			[2000,1263000000]
		],
		"India":[
			[1980,699000000],
			[1990,868900000],
			[2000,1042000000]			
		]
	}

	return(
		<BarGraph data={populations} />
	)
}
```

You can also supply the data in JSON format

```javascript
render() {
  let populations = {
    {country: "China", population: [
    		{year: 1980, count: 981200000}, 
    		{year: 1990, count: 1135000000}, 
    		{year: 2000, count: 1263000000}
    	]
    },
    {country: "India", population: [
    		{year: 1980, count: 699000000}, 
    		{year: 1990, count: 868900000}, 
    		{year: 2000, count: 1042000000}
    	]
    }
  }

  return(
    <BarGraph data={populations} xKey="year" yKey="count" 
    groupKey="country"/>
  )
}
```

- `groupKey` defaults to `"group"`

#### Stacked Bar Graph

You can supply the data as a list of [x_value, y_value_1, y_value_2 ...] and the keys (string) of stacks as a list of [key1, key2 ...] 

```javascript
render() {
	let populations = [
		["China",697631073,658061503],
		["India",641674319,594670312],
		["USA",157082861,161809242]
	]

	let genders = ["male","female"]

	return(
		<BarGraph data={populations} stackKey={genders} />
	)
}
```

You can also supply the data in JSON format

```javascript
render() {
  let populations = {
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
  }

  let genders = ["male","female"]

  return(
    <BarGraph data={populations} xKey="country" 
    yKey="population" stackKey={genders} />
  )
}
```

- `stackKey` defaults to `"stacks"`

### Customization

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

* `color`
 * Optional list of colors in hex codes
 * If specified, fills the bars with the iteration of colors 

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
