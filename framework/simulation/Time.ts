export class Time {
  public static readonly PERFORMANCE_SCALE = 1000
  
  public static get current() { return (performance.timeOrigin + performance.now()) / Time.PERFORMANCE_SCALE }
  public static get frame() { return Time._frame }
  public static get delta() { return Time._delta }

  private static _frame = Time.current
  private static _delta = 0

  public static update() {
    let newTime = Time.current
    Time._delta = newTime - Time._frame
    Time._frame = newTime
  }

  private constructor() { throw new Error('Attempted to instantiate static class') }
}