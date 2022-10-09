import type { Morphable } from '../morphable/Morphable';
import type { Leap } from './Leap';
import { Snapshot } from './Snapshot';
import type { TimeStamp } from './TimeStamp';
import { TimeStamped } from './TimeStamped';

export class Chronology<T extends Morphable<T>> {
  constructor(private root: Snapshot<T>, private length: number) { }

  public get(timeStamp: TimeStamp) {
    let result = this.root;

    for (const l of this.leaps) {
      if (l.timeStamp > timeStamp)
        break

      result = result.advance(l.timeStamp - result.timeStamp).leap(l.value)
    }

    return timeStamp > result.timeStamp
      ? result.advance(timeStamp - result.timeStamp)
      : result;
  }

  public addLeap(timeStamp: TimeStamp, leap: Leap<T>) {
    this.addTimeStampedLeap(new TimeStamped<Leap<T>>(timeStamp, leap))
  }

  public addTimeStampedLeap(leap: TimeStamped<Leap<T>>) {
    this.leaps.splice(
      this.leaps.findIndex((l) => l.timeStamp > leap.timeStamp),
      0,
      leap
    )
  }

  public updateRoot(newRootTimeStamp: TimeStamp) {
    if (newRootTimeStamp < this.root.timeStamp) {
      console.warn('Attempted to move root into the past')
      return
    }

    const newRoot = this.get(newRootTimeStamp)
    this.leaps = this.leaps.filter((l) => l.timeStamp >= newRootTimeStamp)
    this.root = newRoot
  }


  
  private leaps: Array<TimeStamped<Leap<T>>> = []
}