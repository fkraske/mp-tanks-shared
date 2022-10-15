import type { InputMessage } from '../../framework/communication/messages';
import { DirectionState } from './model/DirectionState';

export interface MoveInputMessage extends InputMessage {
  readonly directionState: DirectionState
}

export interface TurnInputMessage extends InputMessage {
  readonly direction: number
}