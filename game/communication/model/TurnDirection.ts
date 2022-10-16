export class TurnDirection {
  public static readonly None = new TurnDirection(0)
  public static readonly Clockwise = new TurnDirection(1)
  public static readonly CounterClockwise = new TurnDirection(-1)

  public static fromDirection(direction: number) {
    return direction < 0 ? TurnDirection.CounterClockwise : direction == 0 ? TurnDirection.None : TurnDirection.Clockwise
  }

  private constructor(public readonly direction: number) { }
}