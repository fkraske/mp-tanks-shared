interface Interpolatable<T extends Interpolatable<T>> {
  interpolate(other: T, t: number): T
}