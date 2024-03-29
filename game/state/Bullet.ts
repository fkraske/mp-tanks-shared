import { Vector2 } from '../../framework/math/Vector2';
import type { Morphable } from '../../framework/morphable/Morphable';
import * as physics from './physics';

export class Bullet implements Morphable<Bullet>, physics.PhysicsObject {
  public static readonly Radius = 0.03
  
  public constructor(
    public readonly position: Vector2,
    public readonly velocity: Vector2
  ) { }

  public get radius() { return Bullet.Radius }

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