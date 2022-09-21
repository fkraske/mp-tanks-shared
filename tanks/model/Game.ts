import { MorphableContainer } from "../../framework/morphable/MorphableContainer"
import { Morphable } from "../../framework/morphable/Morphable"
import { Bullet } from "./Bullet"
import { Player } from "./Player"

export class Game implements Morphable<Game> {
  public constructor(
    public readonly players: MorphableContainer<Player>,
    public readonly bullets: MorphableContainer<Bullet>
  ) { }

  public interpolate(other: Game, t: number): Game {
    return new Game(
      this.players.interpolate(other.players, t),
      this.bullets.interpolate(other.bullets, t)
    )
  }

  public advance(t: number): Game {
    return new Game(
      this.players.advance(t),
      this.bullets.advance(t)
    )
  }
}