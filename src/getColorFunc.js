const getColorFunc = (color) => {
  if (color instanceof Array) {
    let colorFunc = (i, value, group) => {
      return color[i % color.length]
    }
    return colorFunc
  }
  return color // 'color' is already a function
}

export default getColorFunc
