interface Extrapolatable<T extends Extrapolatable<T>> {
  extrapolate(t: number): T
}