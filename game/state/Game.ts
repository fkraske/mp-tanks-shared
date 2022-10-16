import { ID } from '../../framework/id/ID'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { Time } from '../../framework/simulation/Time'
import { DirectionState } from '../communication/model/DirectionState'
import { findNextObjectLevelCollision, findObjectObjectCollision } from './physics'
import { Player } from './Player'

export class Game implements Morphable<Game> {
  public constructor(
    public readonly state = GameState.Starting,
    public readonly player1 = new Player(new Vector2(-0.5, 0), Math.PI),
    public readonly player2 = new Player(new Vector2(0.5, 0), -Math.PI)
  ) { }

  public interpolate(that: Game, t: number) {
    return new Game(
      t > 0 ? that.state : this.state,
      this.player1.interpolate(that.player1, t),
      this.player2.interpolate(that.player2, t)
    )
  }

  public advance(t: number): Game {
    const nextT = t
    const interruption = this.findNextInterruption()
    t = Math.min(t, interruption.t - Time.frame)

    let result = interruption.handle(
      new Game(
        this.state,
        this.player1.advance(t),
        this.player2.advance(t)
      )
    )

    return nextT == t ? result : result.advance(nextT - t)
  }

  private findNextInterruption() {
    return Interruption.reduce(
      new PlayerLevelCollision(findNextObjectLevelCollision(this.player1), 0),
      new PlayerLevelCollision(findNextObjectLevelCollision(this.player2), 1),
      new BulletLevelCollision(
        this.player1.bullet == null
          ? Infinity
          : findNextObjectLevelCollision(this.player1.bullet!),
        0
      ),
      new BulletLevelCollision(
        this.player2.bullet == null
          ? Infinity
          : findNextObjectLevelCollision(this.player2.bullet!),
        1
      ),
      this.findNextPlayerBulletCollision()
    )
  }

  private findNextPlayerBulletCollision() {
    return Interruption.reduce(
      new PlayerBulletCollision(
        this.player2.bullet == null
          ? Infinity
          : findObjectObjectCollision(this.player1, this.player2.bullet!),
        0
      ),
      new PlayerBulletCollision(
        this.player1.bullet == null
          ? Infinity
          : findObjectObjectCollision(this.player2, this.player1.bullet!),
        1
      )
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

abstract class Interruption {
  public constructor(
    public readonly t: number
  ) { }

  public static reduce(...interruptions: Interruption[]) {
    return interruptions.reduce((acc, i) => acc.t < i.t ? acc : i)
  }

  public handle(game: Game) {
    return this.t == Infinity ? game : this.handleImpl(game)
  }

  protected abstract handleImpl(game: Game): Game
}

class PlayerLevelCollision extends Interruption {
  public constructor(
    t: number,
    public readonly playerID: ID
  ) { super(t) }

  protected handleImpl(game: Game): Game {
    throw new Error('Method not implemented.')
  }
}

class BulletLevelCollision extends Interruption {
  public constructor(
    t: number,
    public readonly playerID: ID
  ) { super(t) }

  protected handleImpl(game: Game): Game {
    throw new Error('Method not implemented.')
  }
}

class PlayerBulletCollision extends Interruption {
  public constructor(
    t: number,
    public readonly playerID: ID
  ) { super(t) }

  protected handleImpl(game: Game): Game {
    throw new Error('Method not implemented.')
  }
}

export enum GameState { Starting, Playing, Finished }