import { Vector2 } from '../../framework/math/Vector2';
import { ActiveState } from '../communication/model/ActiveState';
import { Direction } from '../communication/model/Direction';
import { DirectionState } from '../communication/model/DirectionState';

export class PlayerInputState {
  public constructor(
    public readonly movement: ReadonlyMap<Direction, ActiveState> = new Map(),
    public readonly turnDirection = 0
  ) { }

  public getMoveState(direction: Direction) {
    return this.movement.get(direction)
  }

  public getMoveVector() {
    let result = Vector2.Zero
    
    for (const p of this.movement)
      if (p[1] === ActiveState.Active)
        result.addV(p[0].vector)
    
    return result.normalized
  }
  
  public addMoveInput(directionState: DirectionState) {
    let m = new Map(this.movement)
    m.set(directionState.direction, directionState.activeState)
    
    return new PlayerInputState(m, this.turnDirection)
  }

  public addTurnInput(direction: number) {
    return new PlayerInputState(this.movement, direction)
  }
}