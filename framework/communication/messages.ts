import type { Leap } from '../chronology/Leap';
import type { TimeStamp } from '../chronology/TimeStamp';
import { TimeStamped } from '../chronology/TimeStamped';
import type { Morphable } from '../morphable/Morphable';

export interface InputMessage {
  readonly inputTime: TimeStamp
}

export interface AddLeapMessage<T extends Morphable<T>> {
  readonly leap: TimeStamped<Leap<T>>
}
export interface RootUpdateMessage<T extends Morphable<T>> {
  readonly state: T
}