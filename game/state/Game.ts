import { TimeStamp } from '../../framework/chronology/TimeStamp'
import { ID } from '../../framework/id/ID'
import { Vector2 } from '../../framework/math/Vector2'
import type { Morphable } from '../../framework/morphable/Morphable'
import { Time } from '../../framework/simulation/Time'
import { DirectionState } from '../communication/model/DirectionState'
import { LEVEL_EXTENTS } from '../constants'
import { Bullet } from './Bullet'
import { findNextObjectLevelCollision, findObjectObjectCollision } from './PhysicsObject'
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
    let nextT = t
    t = Math.min(t, this.findNextInterruption() - Time.frame)

    let result = new Game(
      this.state,
      this.player1.advance(t),
      this.player2.advance(t)
    )

    //TODO handle interruption
    
    return nextT == t ? result : result.advance(nextT - t)
  }

  private findNextInterruption() {
    return Math.min(
      findNextObjectLevelCollision(this.player1),
      findNextObjectLevelCollision(this.player2),
      this.player1.bullet == null ? Infinity : findNextObjectLevelCollision(this.player1.bullet!),
      this.player2.bullet == null ? Infinity : findNextObjectLevelCollision(this.player2.bullet!),
      this.findNextPlayerBulletCollision()
    )
  }

  private findNextPlayerBulletCollision() {
    return Math.min(
      this.player1.bullet == null ? Infinity : findObjectObjectCollision(this.player1.bullet!, this.player2),
      this.player2.bullet == null ? Infinity : findObjectObjectCollision(this.player2.bullet!, this.player1),
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