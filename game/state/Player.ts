import { Angles } from '../../framework/math/Angles'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { ActiveState } from '../communication/model/ActiveState'
import { MoveDirection } from '../communication/model/MoveDirection'
import { MoveDirectionState } from '../communication/model/MoveDirectionState'
import { TurnDirectionState } from '../communication/model/TurnDirectionState'
import { LEVEL_EXTENTS } from '../constants'
import { Bullet } from './Bullet'
import type { PhysicsObject } from './physics'
import { PlayerInputState } from './PlayerInputState'

export class Player implements Morphable<Player>, PhysicsObject {
  public static readonly Radius = 0.05
  public static readonly MoveSpeed = 0.32
  public static readonly TurnSpeed = Math.PI / 2
  public static readonly BulletSpeed = 0.56
  public static readonly MaxLives = 3
  public static readonly CannonLength = 0.07

  public constructor(
    public readonly position: Vector2,
    public readonly angle: number,
    public readonly input = new PlayerInputState(),
    public readonly bullet?: Bullet,
    public readonly lives: number = Player.MaxLives
  ) { }

  public get forward() {
    return Vector2.fromAngle(this.angle)
  }
  
  public get velocity() {
    return this.input.getMoveVector().mul(Player.MoveSpeed)
  }
  
  public get radius() { return Player.Radius }
  
  public interpolate(that: Player, t: number) {
    return new Player(
      this.position.interpolate(that.position, t),
      Angles.interpolate(this.angle, that.angle, t),
      t > 0 ? that.input : this.input,
      that.bullet ? this.bullet?.interpolate(that.bullet, t) : that.bullet,
      t > 0 ? that.lives : this.lives
    )
  }

  public advance(t: number) {
    return new Player(
      this.position.addV(this.input.getMoveVector().mul(t * Player.MoveSpeed)),
      Angles.normalize(this.angle + this.input.turn.direction * t * Player.TurnSpeed),
      this.input,
      this.bullet?.advance(t),
      this.lives
    )
  }

  public addMoveInput(directionState: MoveDirectionState) {
    return new Player(
      this.position,
      this.angle,
      this.input.addMoveInput(directionState),
      this.bullet,
      this.lives
    )
  }

  public stopMoveX() {
    return this
      .addMoveInput(new MoveDirectionState(MoveDirection.Right, ActiveState.Inactive))
      .addMoveInput(new MoveDirectionState(MoveDirection.Left, ActiveState.Inactive))
  }

  public stopMoveY() {
    return this
      .addMoveInput(new MoveDirectionState(MoveDirection.Up, ActiveState.Inactive))
      .addMoveInput(new MoveDirectionState(MoveDirection.Down, ActiveState.Inactive))
  }

  public handleLevelCollision(point: Vector2) {
    const d = point.abs.subV(LEVEL_EXTENTS).abs
    return d.x < d.y ? this.stopMoveX() : this.stopMoveY()
  }
  
  public addTurnInput(directionState: TurnDirectionState) {
    return new Player(
      this.position,
      this.angle,
      this.input.addTurnInput(directionState),
      this.bullet,
      this.lives
    )
  }

  public addShootInput(activeState: ActiveState) {
    return new Player(
      this.position,
      this.angle,
      this.input.addShootInput(activeState),
      this.input.shoot === ActiveState.Inactive && activeState === ActiveState.Active && !this.bullet
        ? new Bullet(
            this.position.addV(this.forward.mul(Player.CannonLength)),
            this.forward.mul(Player.BulletSpeed)
          )
        : this.bullet,
      this.lives
    )
  }

  public getHurt() {
    return new Player(
      this.position,
      this.angle,
      this.input,
      this.bullet,
      this.lives - 1
    )
  }

  public destroyBullet() {
    return new Player(
      this.position,
      this.angle,
      this.input,
      undefined,
      this.lives
    )
  }
}