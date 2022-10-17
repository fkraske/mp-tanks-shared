import type { Leap } from '../chronology/Leap'
import { TimeStamped } from '../chronology/TimeStamped'
import { ID } from '../id/ID'
import type { Morphable } from '../morphable/Morphable'

export abstract class ClientEvent<T, E extends Morphable<E>> {
  public constructor(public readonly name: string) { }

  public abstract checkType(payload: any): payload is T
  public abstract getTimeStampedLeap(connectionID: ID, eventPayload: T): TimeStamped<Leap<E>>
}