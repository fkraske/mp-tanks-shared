import { Vector2 } from "shared/framework/math/Vector2"
import { Morphable } from "../../framework/morphable/Morphable"
import { MorphableContainer } from "../../framework/morphable/MorphableContainer"
import { Bullet } from "./Bullet"
import { Player } from "./Player"
import { Tank } from "./Tank"

export class Game implements Morphable<Game> {
  public constructor(
    public readonly state: GameState = GameState.Starting,
    public readonly players: MorphableContainer<Player> = new MorphableContainer<Player>(),
    public readonly bullets: MorphableContainer<Bullet> = new MorphableContainer<Bullet>()
  ) { }

  public interpolate(that: Game, t: number) {
    return new Game(
      t < 1 ? this.state : that.state,
      this.players.interpolate(that.players, t),
      this.bullets.interpolate(that.bullets, t)
    )
  }

  public advance(t: number) {
    return new Game(
      this.state,
      this.players.advance(t),
      this.bullets.advance(t)
    )
  }

  public addPlayer(id: number) {
    return new Game(
      this.state,
      this.players.insert(id, new Player(new Tank(Vector2.Zero, 0))), //TODO proper initialization
      this.bullets
    )
  }
}

enum GameState { Starting, Playing, Finished }