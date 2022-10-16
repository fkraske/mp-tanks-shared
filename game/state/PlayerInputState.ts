import { Vector2 } from '../../framework/math/Vector2';
import { ActiveState } from '../communication/model/ActiveState';
import { MoveDirection } from '../communication/model/MoveDirection';
import { MoveDirectionState } from '../communication/model/MoveDirectionState';
import { TurnDirectionState } from '../communication/model/TurnDirectionState';
import { MoveInputMap } from './MoveInputMap';
import { TurnInputMap } from './TurnInputMap';

export class PlayerInputState {
  public constructor(
    public readonly movement: MoveInputMap = new MoveInputMap(),
    public readonly turn: TurnInputMap = new TurnInputMap()
  ) { }

  public getMoveState(direction: MoveDirection) {
    return this.movement.get(direction)
  }

  public getMoveVector() {
    let result = Vector2.Zero
    
    for (const p of this.movement)
      if (p.activeState === ActiveState.Active)
        result = result.addV(p.direction.vector)

    return result.normalized
  }

  public addMoveInput(directionState: MoveDirectionState) {
    return new PlayerInputState(
      this.movement.with(directionState.direction, directionState.activeState),
      this.turn
    )
  }

  public addTurnInput(directionState: TurnDirectionState) {
    return new PlayerInputState(
      this.movement,
      this.turn.with(directionState.direction, directionState.activeState)
    )
  }
}