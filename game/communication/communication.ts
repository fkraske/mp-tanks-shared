import type { InputMessage } from '../../framework/communication/messages';
import { DirectionState } from './model/DirectionState';

export namespace IOEvents {
  export namespace Custom {
    export const INPUT_MOVE = 'client-input-move'
    export const INPUT_TURN = 'client-input-turn'
  }
}

export interface MoveInputMessage extends InputMessage {
  readonly directionState: DirectionState
}

export interface TurnInputMessage extends InputMessage {
  readonly direction: number
}