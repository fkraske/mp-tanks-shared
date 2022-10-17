import type { Leap } from '../chronology/Leap'
import { ID } from '../id/ID'
import type { Morphable } from '../morphable/Morphable'

export abstract class ClientEvent<T, E extends Morphable<E>> {
  public constructor(public readonly name: string) { }

  public abstract checkType(eventPayload: any): eventPayload is T
  public abstract getLeap(connectionID: ID, eventPayload: T): Leap<E>
}