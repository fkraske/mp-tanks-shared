class TimeStampedValue<T> {
  constructor(public readonly timeStamp: TimeStamp, public readonly value: T) { }
}