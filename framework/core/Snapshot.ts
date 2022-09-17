class Snapshot<T extends Fluid<T>> extends TimeStampedValue<T> implements Fluid<Snapshot<T>> {
  public interpolate(other: Snapshot<T>, t: number): Snapshot<T> {
    return new Snapshot((1 - t) * this.timeStamp + t * other.timeStamp, this.value.interpolate(other.value, t))
  }

  public extrapolate(t: number): Snapshot<T> {
    return new Snapshot(this.timeStamp + t, this.value.extrapolate(t))
  }

  public getState(): T { return this.value }
}