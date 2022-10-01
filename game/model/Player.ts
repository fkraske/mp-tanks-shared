import { Morphable } from "../../framework/morphable/Morphable"
import { Tank } from "./Tank"

export class Player implements Morphable<Player> {
  public static readonly LIVES = 3

  public constructor(
    public readonly lives: number = Player.LIVES,
    public readonly tank: Tank
  ) { }

  public interpolate(other: Player, t: number): Player {
    return new Player(
      t < 1 ? this.lives : other.lives,
      this.tank.interpolate(other.tank, t)
    )
  }

  public advance(t: number): Player {
    return new Player(
      this.lives,
      this.tank.advance(t)
    )
  }
}