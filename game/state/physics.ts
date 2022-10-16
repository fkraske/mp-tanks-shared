import { Vector2 } from '../../framework/math/Vector2';
import { LEVEL_EXTENTS } from '../constants';

export interface PhysicsObject {
  readonly position: Vector2
  readonly velocity: Vector2
  readonly radius: number
}

export class Collision {
  protected constructor(
    public readonly t: number,
    public readonly point: Vector2 | null
  ) { }

  public static findObjectLevel(physicsObject: PhysicsObject) {
    const v = physicsObject.velocity;
    const p = physicsObject.position;
    const r = physicsObject.radius;
    const cx = v.x != 0
    const cy = v.y != 0

    //TODO probably can be simplified quite a bit
    if (cx && cy) {
      const tx = (LEVEL_EXTENTS.x * Math.sign(v.x) - p.x - r) / v.x
      const ty = (LEVEL_EXTENTS.y * Math.sign(v.y) - p.y - r) / v.y
      const t = Math.min(tx, ty)
      const offset = new Vector2(Math.sign(v.x) * r, Math.sign(v.y) * r)

      return new Collision(t, p.addV(v.mul(t)).addV(offset))
    } else if (cx && !cy) {
      const t = (LEVEL_EXTENTS.x * Math.sign(v.x) - p.x - r) / v.x
      const offset = new Vector2(Math.sign(v.x) * r, 0)

      return new Collision(t, p.addV(v.mul(t)).addV(offset))
    } else if (!cx && cy) {
      const t = (LEVEL_EXTENTS.y * Math.sign(v.y) - p.y - r) / v.y
      const offset = new Vector2(0, Math.sign(v.y) * r)

      return new Collision(t, p.addV(v.mul(t)).addV(offset))
    } else if (!cx && !cy) {
      return NonCollision
    }
  }

  public static findObjectObject(first: PhysicsObject, second: PhysicsObject) {
    const dp = first.position.subV(second.position)
    const dv = first.velocity.subV(second.velocity)
    const r = first.radius + second.radius

    if (dp.length < r)
      return new Collision(0, Vector2.center(first.position, second.position))

    const a = dv.x * dv.x + dv.y * dv.y

    if (a == 0)
      return NonCollision

    const b = 2 * (dp.x * dv.x + dp.y * dv.y)
    const c = dp.x * dp.x + dp.y * dp.y - r * r
    const rt = b * b - 4 * a * c

    if (rt < 0)
      return NonCollision

    const t1 = (-b + Math.sqrt(rt)) / (2 * a)
    const t2 = (-b - Math.sqrt(rt)) / (2 * a)
    
    if (t1 < 0 && t2 < 0)
      return NonCollision

    const t = t1 < 0
      ? t2
      : t2 < 0
        ? t1
        : Math.min(t1, t2)

    return new Collision(
      t,
      first.position.addV(first.velocity.mul(t)).interpolate(
        second.position.addV(second.velocity.mul(t)),
        r == 0 ? 1 : first.radius / r
      )
    )
  }
}

export const NonCollision = new class extends Collision {
  public constructor() { super(Infinity, null) }
}()

export function findNextObjectLevelCollision(physicsObject: PhysicsObject) {
  const v = physicsObject.velocity;
  const p = physicsObject.position;
  const r = physicsObject.radius;

  return Math.min(
    v.x === 0 ? Infinity : (LEVEL_EXTENTS.x * Math.sign(v.x) - p.x - r) / v.x,
    v.y === 0 ? Infinity : (LEVEL_EXTENTS.y * Math.sign(v.y) - p.y - r) / v.y
  )
}

export function findObjectObjectCollision(first: PhysicsObject, second: PhysicsObject) {
  const dp = first.position.subV(second.position)
  const dv = first.velocity.subV(second.velocity)
  const r = first.radius + second.radius

  if (dp.length < r)
    return 0

  const a = dv.x * dv.x + dv.y * dv.y

  if (a == 0)
    return Infinity

  const b = 2 * (dp.x * dv.x + dp.y * dv.y)
  const c = dp.x * dp.x + dp.y * dp.y - r * r
  const rt = b * b - 4 * a * c

  if (rt < 0)
    return Infinity

  const t1 = (-b + Math.sqrt(rt)) / (2 * a)
  const t2 = (-b - Math.sqrt(rt)) / (2 * a)

  return t1 < 0
    ? t2 < 0
      ? Infinity
      : t2
    : t2 < 0
      ? t1
      : Math.min(t1, t2)
}