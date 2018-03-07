const getLegendValues = (values, colorFunc) => {
  let legendValues = {}
  for (let i = 0; i < values.length; i++) {
    legendValues[values[i]] = colorFunc(i, values[i])
  }
  return legendValues
}

export default getLegendValues
