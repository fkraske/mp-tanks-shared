import { Leap } from '../chronology/Leap';
import { TimeStamp } from '../chronology/TimeStamp';
import { TimeStamped } from '../chronology/TimeStamped';
import { Morphable } from '../morphable/Morphable';

export abstract class Message { }

export abstract class ClientMessage extends Message { }
export abstract class InputMessage extends ClientMessage {
  public constructor(public readonly inputTime: TimeStamp) { super() }
}

export abstract class ServerMessage extends Message { }
export class AddLeapMessage<T extends Morphable<T>> extends ServerMessage {
  public constructor(public readonly leap: TimeStamped<Leap<T>>) { super() }
}
export class RootUpdateMessage<T extends Morphable<T>> extends ServerMessage {
  public constructor(public readonly state: T) { super() }
}