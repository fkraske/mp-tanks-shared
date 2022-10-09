import type { Morphable } from '../morphable/Morphable'
import type { Leap } from './Leap'
import { TimeStamped } from './TimeStamped'

export class Snapshot<T extends Morphable<T>>
  extends TimeStamped<T> implements Morphable<Snapshot<T>> {
  
  public get state() { return this.value }

  public interpolate(that: Snapshot<T>, t: number) {
    return new Snapshot(this.timeStamp.interpolate(that.timeStamp, t), this.value.interpolate(that.value, t))
  }

  public advance(t: number) {
    return new Snapshot(this.timeStamp + t, this.value.advance(t))
  }

  public leap(leap: Leap<T>) {
    return new Snapshot(this.timeStamp, leap(this.value))
  }
}