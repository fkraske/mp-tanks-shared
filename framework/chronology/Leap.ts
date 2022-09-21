abstract class Leap<T extends Morphable<T>> {
  public abstract apply(snapshot: Snapshot<T>): Snapshot<T>
}