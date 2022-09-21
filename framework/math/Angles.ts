//TODO should be namespace instead
const Angles = new class {
  readonly TAU = 2 * Math.PI

  public interpolate(first: number, second: number, t: number) {
    return Math.abs(second - first) < Math.PI
      ? first.interpolate(second, t)
      : this.normalize(first.interpolate(second + this.TAU * Math.sign(first - second), t))
  }
  
  public normalize(angle: number) {
    let x = angle % this.TAU
    return Math.abs(x) <= Math.PI ? x : x - Math.sign(x) * this.TAU
  }
} ()