import { Leap } from "../chronology/Leap";
import { TimeStamped } from "../chronology/TimeStamped";
import { Morphable } from "../morphable/Morphable";

export abstract class Message { }

export abstract class ClientMessage extends Message { }
export abstract class InputMessage extends ClientMessage { }

export abstract class ServerMessage extends Message { }
export class AddDiscontinuityMessage<T extends Morphable<T>> extends ServerMessage {
  public constructor(public readonly discontinuity: TimeStamped<Leap<T>>) { super() }
}
export class RootUpdateMessage<T extends Morphable<T>> extends ServerMessage {
  public constructor(public readonly state: T) { super() }
}