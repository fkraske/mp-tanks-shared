import { Morphable } from "../../framework/morphable/Morphable"
import { Tank } from "./Tank"

export class Player implements Morphable<Player> {
  public static readonly MaxLives = 3

  public constructor(
    public readonly tank: Tank,
    public readonly lives: number = Player.MaxLives
  ) { }

  public interpolate(that: Player, t: number) {
    return new Player(
      this.tank.interpolate(that.tank, t),
      t < 1 ? this.lives : that.lives
    )
  }

  public advance(t: number) {
    return new Player(
      this.tank.advance(t),
      this.lives
    )
  }
}