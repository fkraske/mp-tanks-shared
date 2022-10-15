import { ActiveState } from '../communication/model/ActiveState';
import { Direction } from '../communication/model/Direction';
import { DirectionState } from '../communication/model/DirectionState';

export class MoveInputMap {
  public constructor(
    public readonly up: ActiveState = ActiveState.Inactive,
    public readonly right: ActiveState = ActiveState.Inactive,
    public readonly down: ActiveState = ActiveState.Inactive,
    public readonly left: ActiveState = ActiveState.Inactive
  ) { }

  public get(direction: Direction) {
    switch (direction) {
      case Direction.Up: return this.up
      case Direction.Right: return this.right
      case Direction.Down: return this.down
      case Direction.Left: return this.left
    }
  }

  public with(direction: Direction, state: ActiveState) {
    return new MoveInputMap(
      direction == Direction.Up ? state : this.up,
      direction == Direction.Right ? state : this.right,
      direction == Direction.Down ? state : this.down,
      direction == Direction.Left ? state : this.left
    )
  }

  public clone() {
    return new MoveInputMap(
      this.up,
      this.right,
      this.down,
      this.left
    )
  }

  public *[Symbol.iterator](): Iterator<DirectionState> {
    yield new DirectionState(Direction.Up, this.up)
    yield new DirectionState(Direction.Right, this.right)
    yield new DirectionState(Direction.Down, this.down)
    yield new DirectionState(Direction.Left, this.left)
  }
}