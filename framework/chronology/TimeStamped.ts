import type { TimeStamp } from './TimeStamp';

export class TimeStamped<T> {
  constructor(
    public readonly timeStamp: TimeStamp,
    public readonly value: T
  ) { }
}