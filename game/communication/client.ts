import type { Leap } from '../../framework/chronology/Leap'
import type { TimeStamp } from '../../framework/chronology/TimeStamp'
import { ClientEvent } from '../../framework/communication/client'
import { ID } from '../../framework/id/ID'
import { Game } from '../state/Game'
import { ActiveState } from './model/ActiveState'
import { MoveDirection } from './model/MoveDirection'
import { MoveDirectionState } from './model/MoveDirectionState'
import { TurnDirection } from './model/TurnDirection'
import { TurnDirectionState } from './model/TurnDirectionState'

abstract class ClientGameEvent extends ClientEvent<{ inputTime: TimeStamp }, Game> {
  public constructor(name: string) { super(name) }

  public override checkType(value: any): value is { inputTime: TimeStamp } {
    return typeof(value.inputTime) === 'number'
  }
}

class ClientMoveEvent extends ClientGameEvent {
  public constructor(
    name: string,
    public readonly moveDirectionState: MoveDirectionState
  ) { super(name) }
  
  public override getLeap(connectionID: ID, value: {}): Leap<Game> {
    return g => {
      return g.addPlayerMoveInput(connectionID, this.moveDirectionState)
    }
  }
}

class ClientTurnEvent extends ClientGameEvent {
  public constructor(
    name: string,
    public readonly turnDirectionState: TurnDirectionState
  ) { super(name) }

  public override getLeap(connectionID: ID, value: {}): Leap<Game> {
    return g => {
      return g.addPlayerTurnInput(connectionID, this.turnDirectionState)
    }
  }
}



export const MoveUpStart = new ClientMoveEvent(
  'move-up-start',
  new MoveDirectionState(MoveDirection.Up, ActiveState.Active)
)
export const MoveRightStart = new ClientMoveEvent(
  'move-right-start',
  new MoveDirectionState(MoveDirection.Right, ActiveState.Active)
)
export const MoveDownStart = new ClientMoveEvent(
  'move-down-start',
  new MoveDirectionState(MoveDirection.Down, ActiveState.Active)
)
export const MoveLeftStart = new ClientMoveEvent(
  'move-left-start',
  new MoveDirectionState(MoveDirection.Left, ActiveState.Active)
)
export const MoveUpEnd = new ClientMoveEvent(
  'move-up-end',
  new MoveDirectionState(MoveDirection.Up, ActiveState.Inactive)
)
export const MoveRightEnd = new ClientMoveEvent(
  'move-right-end',
  new MoveDirectionState(MoveDirection.Right, ActiveState.Inactive)
)
export const MoveDownEnd = new ClientMoveEvent(
  'move-down-end',
  new MoveDirectionState(MoveDirection.Down, ActiveState.Inactive)
)
export const MoveLeftEnd = new ClientMoveEvent(
  'move-left-end',
  new MoveDirectionState(MoveDirection.Left, ActiveState.Inactive)
)

export const TurnClockwiseStart = new ClientTurnEvent(
  'turn-clockwise-start',
  new TurnDirectionState(TurnDirection.Clockwise, ActiveState.Active)
)
export const TurnCounterClockwiseStart = new ClientTurnEvent(
  'turn-counterclockwise-start',
  new TurnDirectionState(TurnDirection.CounterClockwise, ActiveState.Active)
)
export const TurnClockwiseEnd = new ClientTurnEvent(
  'turn-clockwise-end',
  new TurnDirectionState(TurnDirection.Clockwise, ActiveState.Inactive)
)
export const TurnCounterClockwiseEnd = new ClientTurnEvent(
  'turn-counterclockwise-end',
  new TurnDirectionState(TurnDirection.CounterClockwise, ActiveState.Inactive)
)