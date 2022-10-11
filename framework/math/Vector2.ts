import type { Interpolatable } from '../morphable/Interpolatable'
import { Utils } from '../util/numberUtils'

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
      Utils.interpolate(this.x, that.x, t),
      Utils.interpolate(this.y, that.y, t)
    )
  }

  public flip() {
    return new Vector2(-this.x, -this.y)
  }
  
  public flipX() {
    return new Vector2(-this.x, this.y)
  }

  public flipY() {
    return new Vector2(this.x, -this.y)
  }

  public get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public get normalized() {
    let l = this.length
    
    return this.div(l == 0 ? 1 : l)
  }
}