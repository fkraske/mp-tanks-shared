import type { Morphable } from '../../framework/morphable/Morphable';
import { Vector2 } from '../../framework/math/Vector2';
import { LEVEL_EXTENTS } from '../constants';
import { PhysicsObject } from './physics';

export class Bullet implements Morphable<Bullet>, PhysicsObject {
  public static readonly Radius = 0.015
  
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