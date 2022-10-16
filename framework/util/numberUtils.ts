export namespace Utils {
  export function interpolate(first: number, second: number, t: number) {
    return (1 - t) * first + t * second
  }
  
  export function floor(n: number, multiple: number) {
    return Math.floor(n / multiple) * multiple
  }

  const DEFAULT_TOLERANCE = 0.00001

  export function aboutEqual(first: number, second: number, tolerance: number = DEFAULT_TOLERANCE) {
    return Math.abs(first - second) < tolerance
  }
}