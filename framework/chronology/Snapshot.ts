import { Morphable } from "../morphable/Morphable"
import { TimeStampedValue } from "./TimeStampedValue"

export class Snapshot<T extends Morphable<T>>
  extends TimeStampedValue<T> implements Morphable<Snapshot<T>> {
  public interpolate(other: Snapshot<T>, t: number): Snapshot<T> {
    return new Snapshot(this.timeStamp.interpolate(other.timeStamp, t), this.value.interpolate(other.value, t))
  }

  public advance(t: number): Snapshot<T> {
    return new Snapshot(this.timeStamp + t, this.value.advance(t))
  }

  public getState(): T { return this.value }
}