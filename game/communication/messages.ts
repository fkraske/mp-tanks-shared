import { InputMessage } from "../../framework/communication/messages";
import { ButtonState } from "../model/ButtonState";
import { Direction } from "../model/Direction";

export abstract class MoveInputMessage extends InputMessage {
  public constructor(
    public readonly direction: Direction,
    public readonly state: ButtonState
  ) { super() }
}