

class Chronology<T extends Fluid<T>> {
  constructor(private root: Snapshot<T>, private length: number) { }

  private leaps: Array<TimeStampedValue<Leap<T>>> = []

  public get(timeStamp: TimeStamp): Snapshot<T> {
    let result = this.root;

    for (const l of this.leaps) {
      if (l.timeStamp > timeStamp)
        break
      
      result = l.value.apply(result.extrapolate(l.timeStamp - result.timeStamp))
    }

    return timeStamp > result.timeStamp
      ? result.extrapolate(timeStamp - result.timeStamp)
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