import { ActiveState } from '../communication/model/ActiveState';
import { MoveDirection } from '../communication/model/MoveDirection';
import { TurnDirection } from '../communication/model/TurnDirection';

export class TurnInputMap {
  public constructor(
    public readonly clockwise: ActiveState = ActiveState.Inactive,
    public readonly counterClockwise: ActiveState = ActiveState.Inactive
  ) { }

  public get(direction: TurnDirection) {
    switch (direction) {
      case TurnDirection.Clockwise: return this.clockwise
      case TurnDirection.CounterClockwise: return this.counterClockwise
    }
  }
  
  public get direction() {
    return +(this.clockwise == ActiveState.Active) - +(this.counterClockwise == ActiveState.Active)
  }

  public with(direction: TurnDirection, state: ActiveState) {
    return new TurnInputMap(
      direction == TurnDirection.Clockwise ? state : this.clockwise,
      direction == TurnDirection.CounterClockwise ? state : this.counterClockwise
    )
  }
}