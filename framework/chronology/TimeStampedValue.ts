import { TimeStamp } from "./TimeStamp";

export class TimeStampedValue<T> {
  constructor(public readonly timeStamp: TimeStamp, public readonly value: T) { }
}