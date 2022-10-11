import type { TimeStamp } from '../../framework/chronology/TimeStamp';
import { InputMessage } from '../../framework/communication/messages';
import { DirectionState } from './model/DirectionState';

export class MoveInputMessage extends InputMessage {
  public constructor(
    inputTime: TimeStamp,
    public readonly directionState: DirectionState
  ) { super(inputTime) }
}

export class TurnInputMessage extends InputMessage {
  public constructor(
    inputTime: TimeStamp,
    public readonly direction: number
  ) { super(inputTime) }
}