import { Morphable } from "../../framework/morphable/Morphable";
import { Vector2 } from "../../framework/math/Vector2";

export class Bullet implements Morphable<Bullet> {
  public constructor(
    public readonly owner: number,
    public readonly position: Vector2,
    public readonly velocity: Vector2
  ) { }

  public interpolate(other: Bullet, t: number): Bullet {
    if (this.owner != other.owner)
      console.warn("Incompatible bullet owners during interpolation")

    return new Bullet(
      other.owner,
      this.position.interpolate(other.position, t),
      this.velocity.interpolate(other.velocity, t)
    );
  }

  public advance(t: number): Bullet {
    return new Bullet(
      this.owner,
      this.position.addV(this.velocity.mul(t)),
      this.velocity
    )
  }
}