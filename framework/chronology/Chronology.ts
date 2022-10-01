import { Morphable } from "../morphable/Morphable";
import { Leap } from "./Leap";
import { Snapshot } from "./Snapshot";
import { TimeStamp } from "./TimeStamp";
import { TimeStamped } from "./TimeStamped";

export class Chronology<T extends Morphable<T>> {
  constructor(private root: Snapshot<T>, private length: number) { }

  public get(timeStamp: TimeStamp): Snapshot<T> {
    let result = this.root;

    for (const l of this.discontinuities) {
      if (l.timeStamp > timeStamp)
        break

      result = l.value.apply(result.advance(l.timeStamp - result.timeStamp))
    }

    return timeStamp > result.timeStamp
      ? result.advance(timeStamp - result.timeStamp)
      : result;
  }

  public addLeap(timeStamp: TimeStamp, leap: Leap<T>) {
    this.addDiscontinuity(new TimeStamped<Leap<T>>(timeStamp, leap))
  }

  public addDiscontinuity(discontinuity: TimeStamped<Leap<T>>) {
    this.discontinuities.splice(
      this.discontinuities.findIndex((l) => l.timeStamp > discontinuity.timeStamp),
      0,
      discontinuity
    )
  }

  public updateRoot(newRootTimeStamp: TimeStamp) {
    if (newRootTimeStamp < this.root.timeStamp) {
      console.warn('Attempted to move root into the past')
      return
    }

    const newRoot = this.get(newRootTimeStamp)
    this.discontinuities = this.discontinuities.filter((l) => l.timeStamp >= newRootTimeStamp)
    this.root = newRoot
  }


  
  private discontinuities: Array<TimeStamped<Leap<T>>> = []
}