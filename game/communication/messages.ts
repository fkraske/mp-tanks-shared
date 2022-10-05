import { TimeStamp } from "../../framework/chronology/TimeStamp";
import { InputMessage } from "../../framework/communication/messages";
import { ButtonState } from "../state/ButtonState";
import { Direction } from "../state/Direction";

export abstract class MoveInputMessage extends InputMessage {
  public constructor(
    timeStamp: TimeStamp,
    public readonly direction: Direction,
    public readonly state: ButtonState
  ) { super(timeStamp) }
}