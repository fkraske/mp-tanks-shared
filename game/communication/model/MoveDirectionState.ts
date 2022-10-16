import { ActiveState } from './ActiveState';
import { MoveDirection } from './MoveDirection';

export class MoveDirectionState {
  public constructor(
    public readonly direction: MoveDirection,
    public readonly activeState: ActiveState
  ) { }
}