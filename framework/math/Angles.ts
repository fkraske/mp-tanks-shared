export const TAU = 2 * Math.PI

export function interpolate(first: number, second: number, t: number) {
  return Math.abs(second - first) < Math.PI
    ? first.interpolate(second, t)
    : normalize(first.interpolate(second + TAU * Math.sign(first - second), t))
}

export function normalize(angle: number) {
  let x = angle % TAU
  return Math.abs(x) <= Math.PI ? x : x - Math.sign(x) * TAU
}