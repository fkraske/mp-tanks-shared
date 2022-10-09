import type { Interpolatable } from '../morphable/Interpolatable'

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

  public addV(that: Vector2) {
    return new Vector2(
      this.x + that.x,
      this.y + that.y
    )
  }

  public subV(that: Vector2) {
    return new Vector2(
      this.x - that.x,
      this.y - that.y
    )
  }

  public mulV(that: Vector2) {
    return new Vector2(
      this.x * that.x,
      this.y * that.y
    )
  }

  public divV(that: Vector2) {
    return new Vector2(
      this.x / that.x,
      this.y / that.y
    )
  }

  public dot(that: Vector2) {
    return this.x * that.x + this.y * that.y
  }

  public interpolate(that: Vector2, t: number) {
    return new Vector2(
      this.x.interpolate(that.x, t),
      this.y.interpolate(that.y, t)
    )
  }

  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public get normalized() {
    return this.div(this.length)
  }
}