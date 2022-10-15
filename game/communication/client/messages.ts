import type { Input } from '../../../framework/communication/messages';
import { DirectionState } from '../model/DirectionState';

export interface MoveInputMessage extends Input {
  readonly directionState: DirectionState
}

export interface TurnInputMessage extends Input {
  readonly direction: number
}