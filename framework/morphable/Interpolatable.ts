export interface Interpolatable<T extends Interpolatable<T>> {
  interpolate(that: T, t: number): T
}