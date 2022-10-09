import { ActiveState } from './ActiveState';
import { Direction } from './Direction';

export class DirectionState {
  public constructor(
    public readonly direction: Direction,
    public readonly activeState: ActiveState
  ) { }
}