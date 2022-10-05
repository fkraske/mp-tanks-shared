import { TimeStamp } from "../../framework/chronology/TimeStamp";
import { InputMessage } from "../../framework/communication/messages";
import { DirectionState } from "./model/DirectionState";

export class MoveInputMessage extends InputMessage {
  public constructor(
    timeStamp: TimeStamp,
    public readonly directionState: DirectionState
  ) { super(timeStamp) }
}

export class TurnInputMessage extends InputMessage {
  public constructor(
    timeStamp: TimeStamp,
    public readonly direction: number
  ) { super(timeStamp) }
}