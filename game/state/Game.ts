import { ID } from '../../framework/id/ID'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { ActiveState } from '../communication/model/ActiveState'
import { MoveDirectionState } from '../communication/model/MoveDirectionState'
import { TurnDirectionState } from '../communication/model/TurnDirectionState'
import { Collision, NonCollision } from './physics'
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
    const tRemaining = t
    const interruption = this.findNextInterruption()
    t = Math.min(t, interruption.t)

    let result = new Game(
      this.state,
      this.player1.advance(t),
      this.player2.advance(t)
    )

    if (interruption.t <= tRemaining)
      result = interruption.handle(result)

    return tRemaining == t ? result : result.advance(tRemaining - t)
  }

  private findNextInterruption() {
    return Interruption.reduce(
      new PlayerLevelCollision(Collision.findObjectLevel(this.player1), 0),
      new PlayerLevelCollision(Collision.findObjectLevel(this.player2), 1),
      new BulletLevelCollision(
        this.player1.bullet == null
          ? NonCollision
          : Collision.findObjectLevel(this.player1.bullet!),
        0
      ),
      new BulletLevelCollision(
        this.player2.bullet == null
          ? NonCollision
          : Collision.findObjectLevel(this.player2.bullet!),
        1
      ),
      new PlayerBulletCollision(
        this.player2.bullet == null
          ? NonCollision
          : Collision.findObjectObject(this.player1, this.player2.bullet!),
        0
      ),
      new PlayerBulletCollision(
        this.player1.bullet == null
          ? NonCollision
          : Collision.findObjectObject(this.player2, this.player1.bullet!),
        1
      )
    )
  }

  public addPlayerMoveInput(playerID: ID, directionState: MoveDirectionState) {
    return new Game(
      this.state,
      playerID === 0 ? this.player1.addMoveInput(directionState) : this.player1,
      playerID === 1 ? this.player2.addMoveInput(directionState) : this.player2,
    )
  }

  public addPlayerTurnInput(playerID: ID, directionState: TurnDirectionState) {
    return new Game(
      this.state,
      playerID === 0 ? this.player1.addTurnInput(directionState) : this.player1,
      playerID === 1 ? this.player2.addTurnInput(directionState) : this.player2,
    )
  }

  public addPlayerShootInput(playerID: ID, activeState: ActiveState) {
    return new Game(
      this.state,
      playerID === 0 ? this.player1.addShootInput(activeState) : this.player1,
      playerID === 1 ? this.player2.addShootInput(activeState) : this.player2
    )
  }

  public switchState(newState: GameState) {
    return new Game(
      newState,
      this.player1,
      this.player2
    )
  }
}

abstract class Interruption {
  public abstract readonly t: number

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
    public readonly collision: Collision,
    public readonly playerID: ID
  ) { super() }

  public override get t() { return this.collision.t }

  protected handleImpl(game: Game) {
    return new Game(
      game.state,
      this.playerID == 0 ? game.player1.handleLevelCollision(this.collision.point!) : game.player1,
      this.playerID == 1 ? game.player2.handleLevelCollision(this.collision.point!) : game.player2
    )
  }
}

class BulletLevelCollision extends Interruption {
  public constructor(
    public readonly collision: Collision,
    public readonly playerID: ID
  ) { super() }

  public override get t() { return this.collision.t }

  protected handleImpl(game: Game) {
    return new Game(
      game.state,
      this.playerID == 0 ? game.player1.destroyBullet() : game.player1,
      this.playerID == 1 ? game.player2.destroyBullet() : game.player2,
    )
  }
}

class PlayerBulletCollision extends Interruption {
  public constructor(
    public readonly collision: Collision,
    public readonly playerID: ID
  ) { super() }

  public override get t() { return this.collision.t }

  protected handleImpl(game: Game) {
    game = new Game(
      game.state,
      this.playerID == 0 ? game.player1.getHurt() : game.player1.destroyBullet(),
      this.playerID == 1 ? game.player2.getHurt() : game.player2.destroyBullet()
    )
    
    return game.player1.lives == 0 || game.player2.lives == 0 ? game.switchState(GameState.Finished) : game
  }
}

export enum GameState { Starting, Playing, Finished }