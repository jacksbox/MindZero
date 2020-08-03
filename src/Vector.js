export const vAdd = (a, b) => {
  a.x += b.x
  a.y += b.y
}

const limit = (v, l) => {
  if (v > l) {
    return l
  } else if (v < -l) {
    return -l
  }
  return v
}

export const vLimit = (a, l) => {
  a.x = limit(a.x, l)
  a.y = limit(a.y, l)
}