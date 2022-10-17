import type { Morphable } from '../morphable/Morphable';
import type { Leap } from './Leap';
import { Snapshot } from './Snapshot';
import type { TimeStamp } from './TimeStamp';
import { TimeStamped } from './TimeStamped';

export class Chronology<T extends Morphable<T>> {
  constructor(private root: Snapshot<T>) { }

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
    const i = this.leaps.findIndex(l => l.timeStamp > leap.timeStamp)
    
    this.leaps.splice(
      i == -1 ? this.leaps.length : i,
      0,
      leap
    )
  }

  public updateRoot(snapshot: Snapshot<T>) {
    this.trim(snapshot.timeStamp)
    this.root = snapshot
  }

  public trim(minTime: TimeStamp) {
    if (minTime < this.root.timeStamp) {
      console.warn('Attempted to move root into the past')
      return
    }

    const newRoot = this.get(minTime)
    this.leaps = this.leaps.filter((l) => l.timeStamp >= minTime)
    this.root = newRoot
  }

  public clear() {
    this.leaps = []
  }

  public *[Symbol.iterator](): Iterator<TimeStamped<Leap<T>>> {
    for (let l of this.leaps)
      yield l
  }


  
  private leaps: TimeStamped<Leap<T>>[] = []
}