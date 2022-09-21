class TanksState implements Morphable<TanksState> {
  public constructor(
    public readonly players: MorphableContainer<Player>,
    public readonly bullets: MorphableContainer<Bullet>
  ) { }
  
  public interpolate(other: TanksState, t: number): TanksState {
    return new TanksState(
      this.players.interpolate(other.players, t),
      this.bullets.interpolate(other.bullets, t)
    )
  }

  public extrapolate(t: number): TanksState {
    return new TanksState(
      this.players.extrapolate(t),
      this.bullets.extrapolate(t)
    )
  }
}