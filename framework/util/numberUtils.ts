export namespace Utils {
  export function interpolate(first: number, second: number, t: number) {
    return (1 - t) * first + t * second
  }
  
  export function floor(n: number, multiple: number) {
    return Math.floor(n / multiple) * multiple
  }
}