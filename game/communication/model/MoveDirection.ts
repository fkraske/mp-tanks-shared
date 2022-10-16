import { Vector2 } from '../../../framework/math/Vector2'

export class MoveDirection {
  public static readonly None = new MoveDirection(Vector2.Zero)
  public static readonly Up = new MoveDirection(new Vector2(0, 1))
  public static readonly Right = new MoveDirection(new Vector2(1, 0))
  public static readonly Down = new MoveDirection(new Vector2(0, -1))
  public static readonly Left = new MoveDirection(new Vector2(-1, 0))

  public static fromVector(vector: Vector2) {
    return Math.abs(vector.x) > Math.abs(vector.y)
      ? vector.x < 0
        ? MoveDirection.Left
        : MoveDirection.Right
      : vector.y < 0
        ? MoveDirection.Down
        : MoveDirection.Up
  }

  private constructor(public readonly vector: Vector2) { }
}