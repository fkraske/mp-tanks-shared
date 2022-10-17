import type { Morphable } from '../morphable/Morphable'
import { Utils } from '../util/numberUtils'
import type { Leap } from './Leap'
import { TimeStamped } from './TimeStamped'

export class Snapshot<T extends Morphable<T>>
  extends TimeStamped<T> implements Morphable<Snapshot<T>> {
  
  public interpolate(that: Snapshot<T>, t: number) {
    return new Snapshot(Utils.interpolate(this.timeStamp, that.timeStamp, t), this.value.interpolate(that.value, t))
  }

  public advance(t: number) {
    return new Snapshot(this.timeStamp + t, this.value.advance(t))
  }

  public leap(leap: Leap<T>) {
    return new Snapshot(this.timeStamp, leap(this.value))
  }
}