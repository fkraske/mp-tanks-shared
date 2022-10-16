import type { Input } from '../../../framework/communication/messages';
import { MoveDirectionState } from '../model/MoveDirectionState';

export interface MoveInputMessage extends Input {
  readonly directionState: MoveDirectionState
}

export interface TurnInputMessage extends Input {
  readonly direction: number
}