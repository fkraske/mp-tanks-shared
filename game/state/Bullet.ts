import { Morphable } from "../../framework/morphable/Morphable";
import { Vector2 } from "../../framework/math/Vector2";

export class Bullet implements Morphable<Bullet> {
  public constructor(
    public readonly position: Vector2,
    public readonly velocity: Vector2
  ) { }

  public interpolate(that: Bullet, t: number) {
    return new Bullet(
      this.position.interpolate(that.position, t),
      this.velocity.interpolate(that.velocity, t)
    );
  }

  public advance(t: number) {
    return new Bullet(
      this.position.addV(this.velocity.mul(t)),
      this.velocity
    )
  }
}