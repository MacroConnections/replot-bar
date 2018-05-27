# replot-bar: Bar graphs for react
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
replot-bar is designed to create beautiful bar graphs right out of the box.
The only *required* input is properly formatted data.

### Basic Usage
In the simplest case, just supply data (as a Javascript array) and specify the
keys associated with the values:

```javascript
render() {
  let populations = [
    {country: "Github", year: 2017, population: 2400000},
    {country: "Netherlands", year: 2017, population: 1703500},
    {country: "Israel", year: 2017, population: 832100},
    {country: "New Zealand", year: 2017, population: 470500},
    {country: "Iceland", year: 2017, population: 33500}
  ]

  return(
    <BarGraph data={populations}
      	xKey="country"
      	yKey="population"
    />
  )
}
```

- `data` is the only required prop
- `xKey` defaults to `"x"`
- `yKey` defaults to `"y"`

![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/basic_default.png)

#### Grouped Bar Graph

You can supply the data as an array of JSON objects.

```javascript
render() {
  let populations = [
    {country: "Github", year: 2015, population: 1100000},
    {country: "Github", year: 2016, population: 1600000},
    {country: "Github", year: 2017, population: 2400000},
    {country: "Netherlands", year: 2015, population: 1692500},
    {country: "Netherlands", year: 2016, population: 1698700},
    {country: "Netherlands", year: 2017, population: 1703500},
    {country: "Israel", year: 2015, population: 806400},
    {country: "Israel", year: 2016, population: 819100},
    {country: "Israel", year: 2017, population: 832100},
    {country: "New Zealand", year: 2015, population: 452900},
    {country: "New Zealand", year: 2016, population: 466000},
    {country: "New Zealand", year: 2017, population: 470500},
    {country: "Iceland", year: 2015, population: 32900},
    {country: "Iceland", year: 2016, population: 33200},
    {country: "Iceland", year: 2017, population: 33500}
  ]

  return(
    <BarGraph data={populations}
      	xKey="year"
      	yKey="population"
      	groupKey="country"
    />
  )
}
```

- `groupKey` defaults to `"group"`

![ScreenshotGroupedBar](https://github.com/replot/replot-bar/raw/master/img/default.png)

### Dimensions
Dimensions may be specified by passing in `width` and `height` props with numbers
in the unit of pixels.

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	width={600}
      	height={450}
    />
  )
}
```

- `width` defaults to `800`
- `height` defaults to `600`

Width dimensions may also be specified with a string, as a percentage. The width
will then be calculated as a proportion of the parent container.

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
        width="50%"
        height={450}
    />
  )
}
```

 Default                   | width={600} height={450}  | width="50%" height={450}        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotDefaultDimensions](https://github.com/replot/replot-bar/raw/master/img/dim_default.png) | ![ScreenshotWidth600pxHeight450px](https://github.com/replot/replot-bar/raw/master/img/w600_h450.png) | ![ScreenshotWidth50%Height450px](https://github.com/replot/replot-bar/raw/master/img/w50_percent.png)

### Error Bars
Error bars may be displayed by passing in `errorBarMinKey` and `errorBarMaxKey` props with the
keys associated with the error ranges.

```javascript
render() {
  let estimates = [
    {country: "Github", year: 2015, population: 1100000, max: 1200000, min: 1000000},
    {country: "Github", year: 2016, population: 1600000, max: 1700000, min: 1500000},
    {country: "Github", year: 2017, population: 2400000, max: 2500000, min: 2300000},
    {country: "Netherlands", year: 2015, population: 1692500, max: 1800000, min: 1600000},
    {country: "Netherlands", year: 2016, population: 1698700, max: 1800000, min: 1600000},
    {country: "Netherlands", year: 2017, population: 1703500, max: 1800000, min: 1600000},
    {country: "Israel", year: 2015, population: 806400, max: 900000, min: 700000},
    {country: "Israel", year: 2016, population: 819100, max: 900000, min: 700000},
    {country: "Israel", year: 2017, population: 832100, max: 900000, min: 700000},
    {country: "New Zealand", year: 2015, population: 452900, max: 550000, min: 450000},
    {country: "New Zealand", year: 2016, population: 466000, max: 550000, min: 450000},
    {country: "New Zealand", year: 2017, population: 470500, max: 550000, min: 450000},
    {country: "Iceland", year: 2015, population: 32900, max: 35000, min: 32000},
    {country: "Iceland", year: 2016, population: 33200, max: 35000, min: 32000},
    {country: "Iceland", year: 2017, population: 33500, max: 35000, min: 32000}
  ]

  return(
    <BarGraph data={estimates} xKey="year" yKey="population" groupKey="country"
      	errorBarMaxKey="max"
	errorBarMinKey="min"
    />
  )
}
```

- `errorBarMaxKey` is unspecified by default
- `errorBarMinKey` is unspecified by default

Color of error bars may also be specified by passing in `errorBarColor` prop with a color string.

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	errorBarMaxKey="max"
	errorBarMinKey="min"
	errorBarColor="#ff0000"
    />
  )
}
```

- `errorBarColor` defaults to `"#AAA"`

 Default                   | Error Bars  | errorBarColor="#ff0000"      
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/default.png) | ![ScreenshotErrorBars](https://github.com/replot/replot-bar/raw/master/img/error_bars.png) | ![ScreenshotErrorBarColor](https://github.com/replot/replot-bar/raw/master/img/error_bar_color.png)


### Colors
Colors may be specified through 2 different mechanisms, both through a `color` prop.
If none of the mechanisms are specified, BarGraph defaults to a built in
color palette.

#### User-provided Color Palette
Users can specify a list of colors to use as a palette, passed to the `color` prop.

```javascript
render() {
  let colors = [
    "#fea9ac", "#fc858f", "#f46b72", "#de836e",
    "#caa56f", "#adcc6f", "#8ebc57", "#799b3f"
  ]

  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country" 
      	color={colors}
    />
  )
}
```

#### User-provided Color function
Users can also specify a function to assign colors to different bars. Expected arguments to the function are the index of the bar (from 0), its corresponding x-value, and its group (if it exists).

```javascript
let colorMe = (i, value, group) => {
  if (group === "Github"){
    return "red"
  } else {
    return "grey"
  }
}

render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	color={colorMe}
    />
  )
}
```

### Axis Customization
Replot BarGraphs allow for incredible customization of the graph axis. A complete
explanation of axis customization can be found below:

#### Titles
Title props accept strings to display in the appropriate location on the graph. To compensate for the inclusion of a title, graph content will be condensed, but the overall size of the component will stay constant.

- `graphTitle`: string displayed above the graph
- `xTitle`: string displayed left of the x-axis
- `yTitle`: string displayed under the y-axis

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
    	graphTitle="Annual Population in the US and China"
      	xTitle="Year"
      	yTitle="Population" />
  )
}
```

Default | Custom titles
:-------------------------:|:-------------------------:
![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/default.png) | ![ScreenshotGraphTitles](https://github.com/replot/replot-bar/raw/master/img/graph_titles.png)

#### Displaying Axis Elements
Users can customize the display of the lines, labels, and gridlines of the axes.

- `showXAxisLine`: defaults to `true`, controls display of the x-axis line
- `showYAxisLine`: defaults to `true`, controls display of the y-axis line
- `showXLabels`: defaults to `true`, controls display of labels on the x-axis
- `showYLabels`: defaults to `true`, controls display of labels on the y-axis
- `showGrid`: defaults to `true`, controls display of gridlines

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	showXAxisLine={false}
	showYAxisLine={false}
	showXLabels={false}
	showYLabels={false}
	showGrid={false}
    />
  )
}
```

Lines hidden | Labels hidden
:-------------------------:|:-------------------------:
![ScreenshotLinesHidden](https://github.com/replot/replot-bar/raw/master/img/lines_hidden.png) | ![ScreenshotLabelsHidden](https://github.com/replot/replot-bar/raw/master/img/labels_hidden.png)

#### Axis Scale
Users can control the scale of the graph, linear or logarithmic. Users can also control the number of increments on the y-axis.

- `yScale`: defaults to `"lin"` for linear scale, can be `"log"` for logarithmic scale

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	yScale="log"
    />
  )
}
```

- `ySteps`: defaults to 1 division per 100 pixels, accepts a number given by the user

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	ySteps={20}
    />
  )
}
```

yScale="log" | yStep={20}
:-------------------------:|:-------------------------:
![ScreenshotScaleLog](https://github.com/replot/replot-bar/raw/master/img/scale_log.png) | ![ScreenshotSteps200](https://github.com/replot/replot-bar/raw/master/img/steps_20.png)

#### Axis Style
Users can customize the axis style by passing in the prop(s) below:

* `axisColor`
  * modifies the color of axis lines
  * defaults to `"#AAA"`
  * accepts any color string
* `tickColor`
  * modifies the color of axis ticks
  * defaults to `"#AAA"`
  * accepts any color string
* `gridColor`
  * modifies the color of axis gridlines
  * defaults to `"#AAA"`
  * accepts any color string
* `labelColor`
  * modifies the color of both axis labels
  * defaults to `"#AAA"`
  * accepts any color string
* `graphTitleColor`
  * modifies the color of all graph titles
  * defaults to `"#AAA"`
  * accepts any color string

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	axisColor="#ff0000"
	tickColor="#ff0000"
	gridColor="#ff0000"
	labelColor="#ff0000"
	graphTitleColor="#ff0000"
    />
  )
}
```

* `axisWidth`
  * modifies the thickness of axis lines
  * defaults to `1.5`
  * accepts any number
* `tickWidth`
  * modifies the thickness of axis ticks
  * defaults to `1.5`
  * accepts any number
* `gridWidth`
  * modifies the thickness of axis gridlines
  * defaults to `1`
  * accepts any number

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	axisWidth={5}
	tickWidth={5}
	gridWidth={5}
    />
  )
}
```

* `axisOpacity`
  * modifies the opacity of axis lines
  * defaults to `1`
  * accepts any number
* `tickOpacity`
  * modifies the opacity of axis ticks
  * defaults to `1`
  * accepts any number
* `gridOpacity`
  * modifies the opacity of axis gridlines
  * defaults to `0.5`
  * accepts any number

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
      	axisOpacity={0.2}
	tickOpacity={0.2}
	gridOpacity={0.2}
    />
  )
}
```

 Custom colors             | Custom widths             | Custom opacities        
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotAxisColors](https://github.com/replot/replot-bar/raw/master/img/axis_colors.png) | ![ScreenshotAxisWidths](https://github.com/replot/replot-bar/raw/master/img/axis_widths.png) | ![ScreenshotAxisOpacities](https://github.com/replot/replot-bar/raw/master/img/axis_opacities.png)

* `labelFontSize`
  * sets the font size of both axis labels
  * automatically calculated when unspecified
  * accepts any number
* `graphTitleFontSize`
  * sets the font size of all graph titles
  * automatically calculated when unspecified
  * accepts any number

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
        labelFontSize={8}
    	graphTitleFontSize={10}
    />
  )
}
```

* `labelFontFamily`
  * sets the font family of both axis labels
  * inherits when unspecified
  * accepts any font family name string
* `graphTitleFontFamily`
  * sets the font family of all graph titles
  * inherits when unspecified
  * accepts any font family name string

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
	labelFontFamily="Courier"
	graphTitleFontFamily="Courier"
    />
  )
}
```

 Custom font sizes | Custom font families
:-------------------------:|:-------------------------:
![ScreenshotAxisFontSizes](https://github.com/replot/replot-bar/raw/master/img/axis_font_sizes.png) | ![ScreenshotAxisFontFamilies](https://github.com/replot/replot-bar/raw/master/img/axis_font_families.png)

### Legend Customization
Users can customize the graph legend in several ways.

- `showLegend`: defaults to `true` if there is a group key, controls display of the legend

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
	showLegend={false}
    />
  )
}
```

 Default | showLegend={false}
:-------------------------:|:-------------------------:
![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/default.png) | ![ScreenshotLegendHidden](https://github.com/replot/replot-bar/raw/master/img/legend_hidden.png)


#### Legend Style
Users can customize the legend style by passing in the prop(s) below:

* `legendFontColor`
	* Modifies the color of the font used in the legend
	* Defaults to `"#AAA"`
	* Accepts any color string
* `legendBackground`
	* Modifies the background color of the legend
	* Defaults to `"none"`
	* Accepts any color string
* `legendShowBorder`
 	* Determines whether a border will be drawn around the legend
	* Defaults to `false`
	* Accepts `true` or `false`
* `legendBorderColor`
	* Modifies the color of the border of the legend
	* Defaults to `"#AAA"`
	* Accepts any color string

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
	legendFontColor="#ff0000"
	legendBackground="#ffffff"
	legendShowBorder={true}
	legendBorderColor="#ff0000"
    />
  )
}
```

 Default | Custom Style
:-------------------------:|:-------------------------:
![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/default.png) | ![ScreenshotLegendStyle](https://github.com/replot/replot-bar/raw/master/img/legend_style.png)

* `legendFontSize`
  * sets the font size of legend texts
  * automatically calculated when unspecified
  * accepts any number
* `legendFontFamily`
  * sets the font family of legend texts
  * inherits when unspecified
  * accepts any font family name string

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
  	legendFontSize={10}
  	legendFontFamily="Courier"
    />
  )
}
```

 Default                   | legendFontSize={10}       | legendFontFamily="Courier"
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotBarDefault](https://github.com/replot/replot-bar/raw/master/img/default.png) | ![ScreenshotLegendFontSize](https://github.com/replot/replot-bar/raw/master/img/legend_font_size.png) | ![ScreenshotLegendFontFamily](https://github.com/replot/replot-bar/raw/master/img/legend_font_family.png)

### Tooltip
Tooltips can display more specific information about a data series.

```javascript
render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
	tooltip={false}
	tooltipColor="light"
    />
  )
}
```

- `tooltip` defaults to `true`, `false` turns the tooltip off
- `tooltipColor` defaults to `dark`, it can be set to `light` or `dark`

 Default tooltip             | tooltipColor="light"          | tooltip={false}   
:-------------------------:|:-------------------------:|:-------------------------:
![ScreenshotTooltipDefault](https://github.com/replot/replot-bar/raw/master/img/tooltip_dark.png) | ![ScreenshotTooltipLight](https://github.com/replot/replot-bar/raw/master/img/tooltip_light.png) | ![ScreenshotTooltipHidden](https://github.com/replot/replot-bar/raw/master/img/default.png)

#### User-provided Tooltip Function
Users can customize what is displayed inside the tooltip with a function. Expected arguments to the function are the data for the specific bar hovered over. The function should return JSX.

```javascript
let fillTooltip = (data) => {
  return(
    <span>The data for this bar looks like {JSON.stringify(data)}</span>
  )
}

render() {
  return(
    <BarGraph data={populations} xKey="year" yKey="population" groupKey="country"
	tooltipContents={fillTooltip}
    />
  )
}
```

![ScreenshotTooltipCustom](https://github.com/replot/replot-bar/raw/master/img/tooltip_custom.png)

### Animation Customization
Users can control the initial animation of the graph, bars growing out from the x-axis line.

- `initialAnimation`: defaults to `true`, controls the animation
