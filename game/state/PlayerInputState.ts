import { Vector2 } from '../../framework/math/Vector2';
import { ActiveState } from '../communication/model/ActiveState';
import { Direction } from '../communication/model/Direction';
import { DirectionState } from '../communication/model/DirectionState';
import { MoveInputMap } from './MoveInputMap';

export class PlayerInputState {
  public constructor(
    public readonly movement: MoveInputMap = new MoveInputMap(),
    public readonly turnDirection = 0
  ) { }

  public getMoveState(direction: Direction) {
    return this.movement.get(direction)
  }

  public getMoveVector() {
    let result = Vector2.Zero
    
    for (const p of this.movement)
      if (p.activeState === ActiveState.Active)
        result.addV(p.direction.vector)

    return result.normalized
  }

  public addMoveInput(directionState: DirectionState) {
    return new PlayerInputState(
      this.movement.with(directionState.direction, directionState.activeState),
      this.turnDirection
    )
  }

  public addTurnInput(direction: number) {
    return new PlayerInputState(this.movement, direction)
  }
}