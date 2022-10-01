import { Interpolatable } from "../morphable/Interpolatable"

export class Vector2 implements Interpolatable<Vector2> {
  public static readonly Zero = new Vector2(0, 0)
  public static readonly One = new Vector2(1, 1)
  
  public constructor(
    public readonly x: number,
    public readonly y: number
  ) { }

  public add(scalar: number) {
    return new Vector2(
      this.x + scalar,
      this.y + scalar
    )
  }

  public sub(scalar: number) {
    return new Vector2(
      this.x - scalar,
      this.y - scalar
    )
  }

  public mul(scalar: number) {
    return new Vector2(
      this.x * scalar,
      this.y * scalar
    )
  }

  public div(scalar: number) {
    return new Vector2(
      this.x / scalar,
      this.y / scalar
    )
  }

  public addV(other: Vector2) {
    return new Vector2(
      this.x + other.x,
      this.y + other.y
    )
  }

  public subV(other: Vector2) {
    return new Vector2(
      this.x - other.x,
      this.y - other.y
    )
  }

  public mulV(other: Vector2) {
    return new Vector2(
      this.x * other.x,
      this.y * other.y
    )
  }

  public divV(other: Vector2) {
    return new Vector2(
      this.x / other.x,
      this.y / other.y
    )
  }

  public dot(other: Vector2) {
    return this.x * other.x + this.y * other.y
  }

  public interpolate(other: Vector2, t: number): Vector2 {
    return new Vector2(
      this.x.interpolate(other.x, t),
      this.y.interpolate(other.y, t)
    )
  }
}