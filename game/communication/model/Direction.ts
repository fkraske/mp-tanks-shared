import { Vector2 } from 'shared/framework/math/Vector2'

export class Direction {
  public static readonly Up = new Direction(new Vector2(0, 1))
  public static readonly Right = new Direction(new Vector2(1, 0))
  public static readonly Down = new Direction(new Vector2(0, -1))
  public static readonly Left = new Direction(new Vector2(-1, 0))

  public static fromVector(vector: Vector2) {
    return Math.abs(vector.x) > Math.abs(vector.y)
      ? vector.x < 0
        ? Direction.Left
        : Direction.Right
      : vector.y < 0
        ? Direction.Down
        : Direction.Up
  }

  private constructor(public readonly vector: Vector2) { }
}