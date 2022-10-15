import type { Leap } from '../chronology/Leap';
import type { TimeStamp } from '../chronology/TimeStamp';
import type { Morphable } from '../morphable/Morphable';

//TODO add connection between events and messages
export interface Input {
  readonly inputTime: TimeStamp
}

export abstract class MessageProcessor<T> {
  protected abstract getValidatedProperties(message: T): any[]

  public isValid(message: T) {
    return this.getValidatedProperties(message).every(m => m !== undefined)
  }
}

export abstract class InputMessageProcessor<T extends Input, E extends Morphable<E>> extends MessageProcessor<T> {
  protected override getValidatedProperties(message: T): any[] {
    return [message.inputTime]
  }
  
  public abstract produceLeap(message: T): Leap<E>
}