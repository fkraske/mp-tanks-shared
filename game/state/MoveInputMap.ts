import { ActiveState } from '../communication/model/ActiveState';
import { MoveDirection } from '../communication/model/MoveDirection';
import { MoveDirectionState } from '../communication/model/MoveDirectionState';

export class MoveInputMap {
  public constructor(
    public readonly up: ActiveState = ActiveState.Inactive,
    public readonly right: ActiveState = ActiveState.Inactive,
    public readonly down: ActiveState = ActiveState.Inactive,
    public readonly left: ActiveState = ActiveState.Inactive
  ) { }

  public get(direction: MoveDirection) {
    switch (direction) {
      case MoveDirection.Up: return this.up
      case MoveDirection.Right: return this.right
      case MoveDirection.Down: return this.down
      case MoveDirection.Left: return this.left
    }
  }

  public with(direction: MoveDirection, state: ActiveState) {
    return new MoveInputMap(
      direction == MoveDirection.Up ? state : this.up,
      direction == MoveDirection.Right ? state : this.right,
      direction == MoveDirection.Down ? state : this.down,
      direction == MoveDirection.Left ? state : this.left
    )
  }

  public *[Symbol.iterator](): Iterator<MoveDirectionState> {
    yield new MoveDirectionState(MoveDirection.Up, this.up)
    yield new MoveDirectionState(MoveDirection.Right, this.right)
    yield new MoveDirectionState(MoveDirection.Down, this.down)
    yield new MoveDirectionState(MoveDirection.Left, this.left)
  }
}