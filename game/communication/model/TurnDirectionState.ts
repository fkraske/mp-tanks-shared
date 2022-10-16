import { ActiveState } from './ActiveState';
import { TurnDirection } from './TurnDirection';

export class TurnDirectionState {
  public constructor(
    public readonly direction: TurnDirection,
    public readonly activeState: ActiveState
  ) { }
}