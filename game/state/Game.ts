import { ID } from '../../framework/id/ID'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { DirectionState } from '../communication/model/DirectionState'
import { Player } from './Player'

export class Game implements Morphable<Game> {
  public constructor(
    public readonly state = GameState.Starting,
    public readonly player1 = new Player(new Vector2(-0.5, 0), 90),
    public readonly player2 = new Player(new Vector2(0.5, 0), 90)
  ) { }

  public interpolate(that: Game, t: number) {
    return new Game(
      t > 0 ? that.state : this.state,
      this.player1.interpolate(that.player1, t),
      this.player2.interpolate(that.player2, t)
    )
  }

  public advance(t: number) {
    return new Game(
      this.state,
      this.player1.advance(t),
      this.player2.advance(t)
    )
  }

  public addPlayerMoveInput(playerID: ID, directionState: DirectionState) {
    return new Game(
      this.state,
      playerID === 0 ? this.player1.addMoveInput(directionState) : this.player1,
      playerID === 1 ? this.player2.addMoveInput(directionState) : this.player2,
    )
  }

  public addPlayerTurnInput(playerID: ID, direction: number) {
    return new Game(
      this.state,
      playerID === 0 ? this.player1.addTurnInput(direction) : this.player1,
      playerID === 1 ? this.player2.addTurnInput(direction) : this.player2,
    )
  }
}

enum GameState { Starting, Playing, Finished }