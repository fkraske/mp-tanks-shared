import { Angles } from "../../framework/math/Angles"
import { Vector2 } from "../../framework/math/Vector2"
import { Morphable } from "../../framework/morphable/Morphable"

export class Tank implements Morphable<Tank> {
  public constructor(
    public readonly position: Vector2,
    public readonly angle: number,
    public readonly velocity: Vector2 = Vector2.Zero,
    public readonly angularVelocity: number = 0,
  ) { }

  public interpolate(that: Tank, t: number) {
    return new Tank(
      this.position.interpolate(that.position, t),
      Angles.interpolate(this.angle, that.angle, t),
      this.velocity.interpolate(that.velocity, t),
      this.angularVelocity.interpolate(that.angularVelocity, t)
    )
  }

  public advance(t: number) {
    return new Tank(
      this.position.addV(this.velocity.mul(t)),
      Angles.normalize(this.angle + this.angularVelocity * t),
      this.velocity,
      this.angularVelocity
    )
  }
}