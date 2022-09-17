class Snapshot<T extends Interpolatable<T> & Extrapolatable<T>> implements Interpolatable<Snapshot<T>>, Extrapolatable<Snapshot<T>> {
  interpolate(other: Snapshot<T>, t: number): Snapshot<T> {
    return new Snapshot((1 - t) * this.timestamp + t * other.timestamp, this.state.interpolate(other.state, t))
  }

  extrapolate(t: number): Snapshot<T> {
    return new Snapshot(this.timestamp + t, this.state.extrapolate(t))
  }

  constructor(private timestamp: DOMHighResTimeStamp, private state: T) { }
}