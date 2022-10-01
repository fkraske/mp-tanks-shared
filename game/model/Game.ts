import { MorphableContainer } from "../../framework/morphable/MorphableContainer"
import { Morphable } from "../../framework/morphable/Morphable"
import { Bullet } from "./Bullet"
import { Player } from "./Player"

export class Game implements Morphable<Game> {
  public constructor(
    public readonly state: GameState = GameState.Starting,
    public readonly players: MorphableContainer<Player> = new MorphableContainer<Player>(),
    public readonly bullets: MorphableContainer<Bullet> = new MorphableContainer<Bullet>()
  ) { }

  public interpolate(other: Game, t: number): Game {
    return new Game(
      t < 1 ? this.state : other.state,
      this.players.interpolate(other.players, t),
      this.bullets.interpolate(other.bullets, t)
    )
  }

  public advance(t: number): Game {
    return new Game(
      this.state,
      this.players.advance(t),
      this.bullets.advance(t)
    )
  }
}

enum GameState { Starting, Playing, Finished }