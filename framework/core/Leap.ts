abstract class Leap<T extends Fluid<T>> {
  public abstract apply(snapshot: Snapshot<T>): Snapshot<T>
}