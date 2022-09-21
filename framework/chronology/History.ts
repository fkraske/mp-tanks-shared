import { Morphable } from "../morphable/Morphable";
import { Leap } from "./Leap";
import { Snapshot } from "./Snapshot";
import { TimeStamp } from "./TimeStamp";
import { TimeStampedValue } from "./TimeStampedValue";

export class History<T extends Morphable<T>> {
  constructor(private root: Snapshot<T>, private length: number) { }

  private leaps: Array<TimeStampedValue<Leap<T>>> = []

  public get(timeStamp: TimeStamp): Snapshot<T> {
    let result = this.root;

    for (const l of this.leaps) {
      if (l.timeStamp > timeStamp)
        break

      result = l.value.apply(result.advance(l.timeStamp - result.timeStamp))
    }

    return timeStamp > result.timeStamp
      ? result.advance(timeStamp - result.timeStamp)
      : result;
  }

  public addLeap(timeStamp: TimeStamp, leap: Leap<T>) {
    this.leaps.splice(
      this.leaps.findIndex((l) => l.timeStamp > timeStamp),
      0,
      new TimeStampedValue<Leap<T>>(timeStamp, leap)
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
}