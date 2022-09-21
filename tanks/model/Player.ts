class Player implements Morphable<Player> {
  public constructor(
    public readonly lives: number,
    public readonly tank: Tank
  ) { }

  public interpolate(other: Player, t: number): Player {
    return new Player(
      t >= 1 ? other.lives : this.lives,
      this.tank.interpolate(other.tank, t)
    )
  }

  public extrapolate(t: number): Player {
    return new Player(
      this.lives,
      this.tank.extrapolate(t)
    )
  }
}