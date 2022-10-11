import { Angles } from '../../framework/math/Angles'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { DirectionState } from '../communication/model/DirectionState'
import { Bullet } from './Bullet'
import { PlayerInputState } from './PlayerInputState'

export class Player implements Morphable<Player> {
  public static readonly Radius = 0.05
  public static readonly MoveSpeed = 0.2
  public static readonly TurnSpeed = Math.PI
  public static readonly MaxLives = 3

  public constructor(
    public readonly position: Vector2,
    public readonly angle: number,
    public readonly input = new PlayerInputState(),
    public readonly bullet?: Bullet,
    public readonly lives: number = Player.MaxLives
  ) { }

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
      Angles.normalize(this.angle + this.input.turnDirection * t * Player.TurnSpeed),
      this.input,
      this.bullet?.advance(t),
      this.lives
    )
  }

  public addMoveInput(directionState: DirectionState) {
    return new Player(
      this.position,
      this.angle,
      this.input.addMoveInput(directionState),
      this.bullet,
      this.lives
    )
  }

  public addTurnInput(direction: number) {
    return new Player(
      this.position,
      this.angle,
      this.input.addTurnInput(direction),
      this.bullet,
      this.lives
    )
  }
}