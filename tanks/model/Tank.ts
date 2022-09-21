class Tank implements Morphable<Tank> {
  public constructor(
    public readonly position: Vector2,
    public readonly velocity: Vector2,
    public readonly angle: number,
    public readonly angularVelocity: number,
  ) { }

  public interpolate(other: Tank, t: number): Tank {
    return new Tank(
      this.position.interpolate(other.position, t),
      this.velocity.interpolate(other.velocity, t),
      Angles.interpolate(this.angle, other.angle, t),
      this.angularVelocity.interpolate(other.angularVelocity, t)
    )
  }

  public extrapolate(t: number): Tank {
    return new Tank(
      this.position.addV(this.velocity.mul(t)),
      this.velocity,
      Angles.normalize(this.angle + this.angularVelocity * t),
      this.angularVelocity
    )
  }
}