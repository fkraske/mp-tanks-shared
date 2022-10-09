import type { Interpolatable } from '../morphable/Interpolatable'

declare global {
  export interface Number extends Interpolatable<number> {
    floor(multiple: number): number
  }
}

Number.prototype.interpolate = function (that: number, t: number) {
  return (1 - t) * Number(this) + t * that
}

Number.prototype.floor = function (multiple: number) {
  return Math.floor(Number(this) / multiple) * multiple
}