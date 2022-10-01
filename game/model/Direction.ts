import { Vector2 } from "shared/framework/math/Vector2"

export class Direction {
  public static readonly UP = new Direction(new Vector2(0, 1))
  public static readonly RIGHT = new Direction(new Vector2(1, 0))
  public static readonly DOWN = new Direction(new Vector2(0, -1))
  public static readonly LEFT = new Direction(new Vector2(-1, 0))

  public static fromVector(vector: Vector2) {
    return Math.abs(vector.x) > Math.abs(vector.y)
      ? vector.x < 0
        ? Direction.LEFT
        : Direction.RIGHT
      : vector.y < 0
        ? Direction.DOWN
        : Direction.UP
  }

  private constructor(public readonly vector: Vector2) { }
}