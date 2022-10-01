import { Morphable } from "../morphable/Morphable"
import { TimeStamped } from "./TimeStamped"

export class Snapshot<T extends Morphable<T>>
  extends TimeStamped<T> implements Morphable<Snapshot<T>> {
  public interpolate(other: Snapshot<T>, t: number): Snapshot<T> {
    return new Snapshot(this.timeStamp.interpolate(other.timeStamp, t), this.value.interpolate(other.value, t))
  }

  public advance(t: number): Snapshot<T> {
    return new Snapshot(this.timeStamp + t, this.value.advance(t))
  }

  public getState(): T { return this.value }
}