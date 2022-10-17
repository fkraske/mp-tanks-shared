import { ID } from '../../framework/id/ID'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { Utils } from '../../framework/util/numberUtils'
import { ActiveState } from '../communication/model/ActiveState'
import { MoveDirectionState } from '../communication/model/MoveDirectionState'
import { TurnDirectionState } from '../communication/model/TurnDirectionState'
import { Collision, NonCollision } from './physics'
import { Player } from './Player'

export class Game implements Morphable<Game> {
  public static readonly FinishDuration = 5

  public constructor(
    public readonly state: GameState = GameState.Playing,
    public readonly player1 = new Player(new Vector2(-0.5, 0), Math.PI / 2),
    public readonly player2 = new Player(new Vector2(0.5, 0), -Math.PI / 2)
  ) { }

  public static cloneDeserialized(game: Game) {
    return new Game(
      (game.state as any).waitRemaining === undefined
        ? GameState.Playing
        : new GameState.Finished((game.state as any).waitRemaining),
      Player.cloneDeserialized(game.player1),
      Player.cloneDeserialized(game.player2)
    )
  }

  public interpolate(that: Game, t: number) {
    return new Game(
      this.state.interpolate(that.state, t),
      this.player1.interpolate(that.player1, t),
      this.player2.interpolate(that.player2, t)
    )
  }

  public advance(t: number): Game {
    const tRemaining = t
    const interruption = this.findNextInterruption()
    t = Math.min(t, interruption.t)

    let result = this.state === GameState.Playing
      ? new Game(
        this.state,
        this.player1.advance(t),
        this.player2.advance(t)
      )
      : new Game(
        this.state.advance(t),
        this.player1,
        this.player2
      )

    if (interruption.t <= tRemaining)
      result = interruption.handle(result)

    return tRemaining == t ? result : result.advance(tRemaining - t)
  }

  private findNextInterruption() {
    return this.state instanceof GameState.Finished
      ? new GameRestart(this.state.waitRemaining)
      : Interruption.reduce(
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
    return this.t == Infinity ? game : this.handleInternal(game)
  }

  protected abstract handleInternal(game: Game): Game
}

class PlayerLevelCollision extends Interruption {
  public constructor(
    public readonly collision: Collision,
    public readonly playerID: ID
  ) { super() }

  public override get t() { return this.collision.t }

  protected handleInternal(game: Game) {
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

  protected handleInternal(game: Game) {
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

  protected handleInternal(game: Game) {
    game = new Game(
      game.state,
      this.playerID == 0 ? game.player1.getHurt() : game.player1.destroyBullet(),
      this.playerID == 1 ? game.player2.getHurt() : game.player2.destroyBullet()
    )

    return game.player1.lives == 0 || game.player2.lives == 0
      ? game.switchState(new GameState.Finished(Game.FinishDuration))
      : game
  }
}

class GameRestart extends Interruption {
  public constructor(public readonly t: number) { super() }

  protected handleInternal(game: Game): Game {
    return new Game()
  }
}

export abstract class GameState implements Morphable<GameState> {
  private constructor() { }
  public abstract interpolate(that: GameState, t: number): GameState
  public abstract advance(t: number): GameState

  public static Playing = new class extends GameState {
    public constructor() { super() }

    public interpolate(that: GameState, t: number): GameState {
      return t > 0 ? that : this
    }

    public advance(t: number): GameState {
      return this
    }
  } ()
  public static Finished = class extends GameState {
    public constructor(public readonly waitRemaining: number) { super() }

    public interpolate(that: GameState, t: number): GameState {
      return that instanceof GameState.Finished
        ? new GameState.Finished(
          Utils.interpolate(
            this.waitRemaining,
            that.waitRemaining,
            t
          )
        )
        : t > 0
          ? that
          : this
    }

    public advance(t: number): GameState {
      return new GameState.Finished(this.waitRemaining - t)
    }
  }
}