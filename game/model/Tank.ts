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

  public interpolate(other: Tank, t: number): Tank {
    return new Tank(
      this.position.interpolate(other.position, t),
      Angles.interpolate(this.angle, other.angle, t),
      this.velocity.interpolate(other.velocity, t),
      this.angularVelocity.interpolate(other.angularVelocity, t)
    )
  }

  public advance(t: number): Tank {
    return new Tank(
      this.position.addV(this.velocity.mul(t)),
      Angles.normalize(this.angle + this.angularVelocity * t),
      this.velocity,
      this.angularVelocity
    )
  }
}