export namespace Utils {
  export function interpolate(first: number, second: number, t: number) {
    return (1 - t) * first + t * second
  }
  
  export function floor(n: number, multiple: number) {
    return Math.floor(n / multiple) * multiple
  }

  export function clamp(n: number, low: number, high: number) {
    return Math.max(Math.min(n, high), low)
  }

  export function clamp01(n: number) {
    return clamp(n, 0, 1)
  }

  const DEFAULT_TOLERANCE = 0.00001

  export function aboutEqual(first: number, second: number, tolerance: number = DEFAULT_TOLERANCE) {
    return Math.abs(first - second) < tolerance
  }
}